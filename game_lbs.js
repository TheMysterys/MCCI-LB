const { MongoClient } = require("mongodb");
const { log, LogType, logException } = require("@themysterys/pretty-log");
const {
	tgttosQuery,
	sbQuery,
	bbQuery,
	rocketQuery,
	pkSoloQuery,
	dynaballQuery,
	hitwQuery,
	pwSurvivorQuery,
} = require("./query");

const client = new MongoClient(process.env.MONGO_URI);

const games = {
	tgttos: ["topThree", "first", "chickens", "rounds"],
	sky_battle: ["topThree", "first", "kills"],
	battle_box: ["team", "first", "kills"],
	rocket_spleef: ["kills", "first", "topFive", "survive", "hits"],
	pw_survivor: ["outlive", "duel", "leapFour", "leapSeven"],
	pw_solo: ["medals", "totalMedals"],
	dynaball: ["wins", "kills", "blocks", "survive"],
	hitw: ["first", "topThree", "walls"],
};

const APIErrors = {
	API_OFFLINE: 1, // API is offline
	UNKNOWN_STATUS: 2, // Returned a status that wasn't 200
	REQUEST_ERROR: 3, // Issue with request query
};

let hasErrored = false;
const leaderboardData = {
	tgttos: {},
	sky_battle: {},
	battle_box: {},
	rocket_spleef: {},
	pw_survivor: {},
	pw_solo: {},
	dynaball: {},
	hitw: {},
};

async function main() {
	await client.connect();
	const db = client.db("leaderboards");
	log("Connected to MongoDB", LogType.NETWORK);

	for (const game in games) {
		if (hasErrored) {
			break;
		}
		await new Promise((resolve) => setTimeout(resolve, 1000));
		await updateLeaderboard(db, game);
	}

	if (hasErrored) {
		log("There was an error. Data will not be saved.");
		client.close();
		log("Closed connection to MongoDB", LogType.NETWORK);
		return;
	}

	for (const game in leaderboardData) {
		const collection = db.collection(`${game}_leaderboards`);
		log(`Saving leaderboard data for game: ${game}`);

		for (const key in leaderboardData[game]) {
			// Insert leaderboard in database for graphs
			await collection.insertOne({
				date: new Date(),
				key: key,
				data: leaderboardData[game][key],
			});
		}
	}

	client.close();
	log("Closed connection to MongoDB", LogType.NETWORK);
}

async function getLBData(game) {
	let query = "";
	switch (game) {
		case "tgttos": {
			query = tgttosQuery;
			break;
		}
		case "sky_battle": {
			query = sbQuery;
			break;
		}
		case "battle_box": {
			query = bbQuery;
			break;
		}
		case "rocket_spleef": {
			query = rocketQuery;
			break;
		}
		case "pw_solo": {
			query = pkSoloQuery;
			break;
		}
		case "pw_survivor": {
			query = pwSurvivorQuery;
			break;
		}
		case "dynaball": {
			query = dynaballQuery;
			break;
		}
		case "hitw": {
			query = hitwQuery;
			break;
		}
		default: {
			log("How did we get here?", LogType.ERROR);
			return { data: null, error: APIErrors.REQUEST_ERROR };
		}
	}
	const request = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Trophy Hunters Leaderboards",
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

async function updateLeaderboard(db, game) {
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
									"Leaderboards will resume tomorrow",
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
								title: "Error Updating Leaderboard",
								description: [
									"Please contact TheMysterys",
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
		}
		hasErrored = true;
		return;
	}

	const now = new Date();

	for (const lb_key of games[game]) {
		const fullLeaderboard = [
			...data[lb_key + "1"].leaderboard,
			...data[lb_key + "2"].leaderboard,
		];

		leaderboardData[game][lb_key] = fullLeaderboard;
	}

	return;
}

main();
