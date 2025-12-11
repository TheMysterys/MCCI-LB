const { log, LogType, logException } = require("@themysterys/pretty-log");
const leaderboards = require("./leaderboards.json");

const { createClient } = require("@clickhouse/client");

const client = createClient({
	url: process.env.CLICKHOUSE_URL,
	password: process.env.CLICKHOUSE_PASSWORD,
	username: process.env.CLICKHOUSE_USER,
	database: "mcci",
});

const APIErrors = {
	API_OFFLINE: 1, // API is offline
	UNKNOWN_STATUS: 2, // Returned a status that wasn't 200
	REQUEST_ERROR: 3, // Issue with request query
};

let hasErrored = false;
const leaderboardData = {
	tgttos: {},
	sky_battle_quads: {},
	battle_box_quads: {},
	rocket_spleef: {},
	pw_survival: {},
	pw_solo: {},
	dynaball: {},
	hole_in_the_wall: {},
	battle_box_arena: {},
};

async function main() {
	log("Connected to Clickhouse", LogType.NETWORK);

	for (const game in leaderboards) {
		if (hasErrored) {
			break;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await updateLeaderboard(game);
	}

	if (hasErrored) {
		log("There was an error. Data will not be saved.", LogType.ERROR);
		client.close();
		log("Closed connection to Clickhouse", LogType.NETWORK);
		return;
	}

	for (const game in leaderboardData) {
		log(`Saving leaderboard data for game: ${game}`);
		let databaseRows = [];
		for (const statistic in leaderboardData[game]) {
			databaseRows.push(
				...leaderboardData[game][statistic].map((entry) => ({
					statistic,
					uuid: entry.player?.uuid ?? null,
					username: entry.player?.username ?? null,
					ranks: entry.player?.ranks ?? [],
					rank: entry.rank,
					Value: entry.value,
				}))
			);
		}
		await client.insert({
			table: `leaderboard_${game}`,
			values: databaseRows,
			format: "JSONEachRow",
		});
	}

	client.close();
	log("Closed connection to Clickhouse", LogType.NETWORK);
}

async function getLBData(game) {
	let query = "query Leaderboard {";

	for (let statistic of leaderboards[game]) {
		query += `${statistic}1: statistic(key: "${game}_${statistic}") {
			leaderboard(amount: 50, offset: 0) {
			player {
				uuid
				username
				ranks
			}
			rank
			value
			}
		}
		${statistic}2: statistic(key: "${game}_${statistic}") {
			leaderboard(amount: 50, offset: 50) {
			player {
				uuid
				username
				ranks
			}
			rank
			value
			}
		}
		`;
	}
	query += "}";

	const request = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "MCC Island Leaderboards (@TheMysterys)",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query,
		}),
	});

	// Check if API down
	if (request.status === 502) {
		log(`MCC Island API is currently down. Skipping...`, LogType.ERROR);
		return { data: null, error: APIErrors.API_OFFLINE };
	}

	let rawData;
	try {
		rawData = await request.json();
	} catch (e) {
		logException(e);
		return { data: null, error: APIErrors.API_OFFLINE };
	}

	if (request.status !== 200) {
		log(`MCC Island API returned status: ${request.status}`, LogType.ERROR);
		console.error("Response:", rawData);
		return { data: null, error: APIErrors.UNKNOWN_STATUS };
	}

	if (rawData.errors) {
		log(`${rawData.errors.length} Error(s) with request`, LogType.ERROR);
		for (let i = 0; i < rawData.errors.length; i++) {
			log(`Error ${i + 1}: ${rawData.errors[i].message}`, LogType.ERROR);
		}
		return { data: null, error: APIErrors.REQUEST_ERROR };
	}

	return { data: rawData.data, error: null };
}

async function updateLeaderboard(game) {
	log(`Updating leaderboard for game: ${game}`);

	log("Fetching leaderboard data from API");
	const { data, error } = await getLBData(game);

	const webhookUrl = process.env.GAMES;

	// Post Errors
	if (error) {
		switch (error) {
			case APIErrors.API_OFFLINE: {
				await fetch(webhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						embeds: [
							{
								title: "MCCI API is offline",
								description: [
									"Game Leaderboards will resume tomorrow",
								].join("\n"),
								color: 0xff0000,
								footer: {
									text: "Errored at",
								},
								timestamp: new Date(),
							},
						],
					}),
				});
				break;
			}
			case (APIErrors.UNKNOWN_STATUS, APIErrors.REQUEST_ERROR): {
				// Send Error to TheMysterys
				await fetch(webhookUrl, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						embeds: [
							{
								title: "Error Updating Game Leaderboards",
								color: 0xff0000,
								footer: {
									text: "Errored at",
								},
								timestamp: new Date(),
							},
						],
					}),
				});
				break;
			}
		}
		hasErrored = true;
		return;
	}

	for (const lb_key of leaderboards[game]) {
		const fullLeaderboard = [
			...data[lb_key + "1"]?.leaderboard ?? [],
			...data[lb_key + "2"]?.leaderboard ?? [],
		];

		leaderboardData[game][lb_key] = fullLeaderboard;
	}

	return;
}

main();
