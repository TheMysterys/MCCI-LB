const { log, LogType, logException } = require("@themysterys/pretty-log");
const { factionQuery } = require("./query");

const { createClient } = require("@clickhouse/client");

const client = createClient({
	url: process.env.CLICKHOUSE_URL,
	password: process.env.CLICKHOUSE_PASSWORD,
	username: process.env.CLICKHOUSE_USER,
	database: "mcci",
});

const crowns = [
	"<:CROWN:1122664056160010323>",
	"<:1_:1394998866461593710>",
	"<:5_:1394998874816385064>",
];

const factionKeys = [
	"RED_RABBITS",
	"ORANGE_OCELOTS",
	"YELLOW_YAKS",
	"GREEN_GECKOS",
	"LIME_LLAMAS",
	"CYAN_COYOTES",
	"BLUE_BATS",
	"AQUA_AXOLOTLS",
	"PINK_PARROTS",
	"PURPLE_PANDAS",
];

const factionColor = {
	AQUA_AXOLOTLS: 0x54dafc,
	BLUE_BATS: 0x5486fc,
	CYAN_COYOTES: 0x00b997,
	GREEN_GECKOS: 0x00a800,
	LIME_LLAMAS: 0x54fc54,
	ORANGE_OCELOTS: 0xfca800,
	PINK_PARROTS: 0xfc54fc,
	PURPLE_PANDAS: 0x8632fc,
	RED_RABBITS: 0xfc5453,
	YELLOW_YAKS: 0xfcfc54,
};

const factionIcon = {
	AQUA_AXOLOTLS: "<:aqua:1425958474423996436>",
	BLUE_BATS: "<:blue:1425958485358809190>",
	CYAN_COYOTES: "<:cyan:1425958498876915735>",
	GREEN_GECKOS: "<:green:1425958526727094424>",
	LIME_LLAMAS: "<:lime:1425958539041443890>",
	ORANGE_OCELOTS: "<:orange:1425958549141586061>",
	PINK_PARROTS: "<:pink:1425958558452813905>",
	PURPLE_PANDAS: "<:purple:1425958568296714300>",
	RED_RABBITS: "<:red:1425958579365613609>",
	YELLOW_YAKS: "<:yellow:1425958587074744490>",
};

const APIErrors = {
	API_OFFLINE: 1, // API is offline
	UNKNOWN_STATUS: 2, // Returned a status that wasn't 200
	REQUEST_ERROR: 3, // Issue with request query
};

async function main() {
	log("Connected to Clickhouse", LogType.NETWORK);

	await updateLeaderboard();

	client.close();
	log("Closed connection to Clickhouse", LogType.NETWORK);
}

async function getLBData() {
	const request = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "MCC Island Leaderboards (@TheMysterys)",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query: factionQuery,
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

async function updateLeaderboard() {
	log("Fetching Faction Leaderboard data from API");
	const { data, error } = await getLBData();

	const webhookUrls = process.env.FACTIONS.split(",");

	// Post Errors
	if (error) {
		switch (error) {
			case APIErrors.API_OFFLINE: {
				for (const webhookUrl of webhookUrls) {
					if (webhookUrl == "") continue;
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
										"Faction Leaderboards will resume tomorrow",
									].join("\n"),
									color: 0xff0000,
								},
							],
						}),
					});
				}
				break;
			}
			case (APIErrors.UNKNOWN_STATUS, APIErrors.REQUEST_ERROR): {
				// Only send the error notice to Trophy Hunting Discord channels
				if (webhookUrls[0] == "") return;
				await fetch(webhookUrls[0], {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						embeds: [
							{
								title: "Error Updating Factions Leaderboard",
								description: [
									data.error,
									"Please contact TheMysterys",
								].join("\n"),
								color: 0xff0000,
							},
						],
					}),
				});
				break;
			}
		}
		return;
	}

	// Group Faction Leaderboards
	const groupedLeaderboards = {};
	for (const faction of factionKeys) {
		const l1 = data[`${faction}1`]?.leaderboard || [];
		const l2 = data[`${faction}2`]?.leaderboard || [];
		groupedLeaderboards[faction] = [...l1, ...l2];
	}

	// Factions Leaderboard

	// get past leaderboard
	const factionRows = await client.query({
		query: `SELECT
					name,
					argMax(value, ts) AS value,
					argMax(rank, ts) AS rank,
					max(ts) AS last_updated
				FROM mcci.leaderboard_factions
				GROUP BY name
				ORDER BY rank ASC;`,
		format: "JSONEachRow",
	});

	const pastFactionsLeaderboard = (await factionRows.json()) ?? [];
	const currentFactionsLeaderboard = data.factionLeaderboard;

	// Get movement of each player
	const factionsResult = getFactionMovement(
		pastFactionsLeaderboard,
		currentFactionsLeaderboard
	);

	log(`Updating Faction Leaderboard`);
	if (
		factionsResult.some((entry) => entry.change !== 0 || entry.direction !== "") ||
		pastFactionsLeaderboard.length == 0
	) {
		function factionName(str) {
			str = str.replace(/_/g, " ").toLowerCase();

			return str
				.split(" ")
				.map((word) => {
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join(" ");
		}

		const embed = {
			title: "Factions Leaderboard",
			color: factionColor[factionsResult[0].name],
			description: factionsResult
				.map((entry) => {
					return `${
						crowns[entry.rank - 1] || "<:__:1394998791458787348>"
					}**#${
						entry.rank < 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1394998791458787348>"} - ${
						factionIcon[entry.name]
					}${factionName(
						entry.name
					)} - ${entry.value.toLocaleString()}% ${
						entry.change !== undefined && entry.change !== 0
							? `(${
									entry.change > 0 ? "+" : ""
							  }${entry.change.toLocaleString()}%)`
							: ""
					}`;
				})
				.join("\n"),
			footer: {
				text: "Last Updated",
			},
			timestamp: new Date(),
		};

		for (const webhookUrl of webhookUrls) {
			if (webhookUrl.trim() == "") continue;
			await fetch(webhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					embeds: [embed],
				}),
			});
		}
	} else {
		log("Factions leaderboard did not change", LogType.INFORMATION);
	}

	const pastTop20Rows = await client.query({
		query: `
		SELECT
			uuid,
			argMax(value, ts) AS value,
			argMax(username, ts) AS username,
			argMax(faction, ts) AS faction,
			max(ts) AS last_updated
		FROM mcci.leaderboard_factions_players
		WHERE toDate(ts) > toDate(now()) - INTERVAL 1 DAY
		GROUP BY uuid
		ORDER BY value DESC 
		LIMIT 25;
		`,
		format: "JSONEachRow",
	});

	const pastTop20 = (await pastTop20Rows.json()) ?? [];

	const allFactionPlayers = Object.entries(groupedLeaderboards).flatMap(
		([faction, players]) =>
			players.map((entry) => ({
				faction,
				uuid: entry.player.uuid,
				username: entry.player.username,
				ranks: entry.player.ranks,
				rank: entry.rank,
				value: entry.value,
			}))
	);

	const currentTop20 = allFactionPlayers
		.sort((a, b) => b.value - a.value)
		.slice(0, 25);

	const top20Result = currentTop20.map((currentEntry, idx) => {
		const pastIndex = pastTop20.findIndex(
			(p) => p.uuid === currentEntry.uuid
		);
		let past = pastTop20[pastIndex];
		let change = past ? currentEntry.value - past.value : 0;
		let direction = "";

		if (past) {
			if (idx + 1 < pastIndex + 1) direction = ":arrow_up:";
			else if (idx + 1 > pastIndex + 1) direction = ":arrow_down:";
		}
		return {
			...currentEntry,
			change,
			direction,
			rank: idx + 1,
		};
	}).slice(0, 20);

	log(`Updating Faction Top 20 Leaderboard`);
	if (
		top20Result.some((entry) => entry.change !== 0) ||
		pastTop20.length == 0
	) {
		const top20Embed = {
			title: "Top 20 Players Across All Factions",
			color: 0xfccf03,
			description: top20Result
				.map((entry) => {
					return `${
						crowns[entry.rank - 1] || "<:__:1394998791458787348>"
					}**#${
						entry.rank < 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${
						entry.direction || "<:__:1394998791458787348>"
					} - ${entry.username.replaceAll("_", "\\_")}${
						factionIcon[entry.faction]
					} - ${entry.value.toLocaleString()}XP ${
						entry.change !== undefined && entry.change !== 0
							? `(${
									entry.change > 0 ? "+" : ""
							  }${entry.change.toLocaleString()}XP)`
							: ""
					}`;
				})
				.join("\n"),
			footer: { text: "Last Updated" },
			timestamp: new Date(),
		};

		for (const webhookUrl of webhookUrls) {
			if (webhookUrl.trim() == "") continue;
			await fetch(webhookUrl, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					embeds: [top20Embed],
				}),
			});
		}
	} else {
		log("Factions Top 20 Leaderboard did not change", LogType.INFORMATION);
	}

	// Insert factions leaderboard in database for graphs
	await client.insert({
		table: "leaderboard_factions",
		values: currentFactionsLeaderboard.map((entry) => ({
			name: entry.name,
			value: entry.value,
			rank: entry.rank,
		})),
		format: "JSONEachRow",
	});

	log("Inserted factions leaderboard into Clickhouse", LogType.SUCCESS);

	// Insert top players for each faction
	await client.insert({
		table: "leaderboard_factions_players",
		values: allFactionPlayers,
		format: "JSONEachRow",
	});

	log(
		`Inserted ${allFactionPlayers.length} faction player rows into ClickHouse`,
		LogType.SUCCESS
	);
}

function getFactionMovement(pastLeaderboard, currentLeaderboard) {
	let result = [];

	currentLeaderboard.forEach((currentEntry) => {
		let pastEntry = pastLeaderboard.find(
			(entry) => entry.name === currentEntry.name
		);

		if (pastEntry) {
			let change = currentEntry.value - pastEntry.value;
			let direction = "";

			if (currentEntry.rank < pastEntry.rank) {
				direction = ":arrow_up:"; // Moved up
			} else if (currentEntry.rank > pastEntry.rank) {
				direction = ":arrow_down:"; // Moved down
			}

			result.push({ ...currentEntry, change, direction });
		} else {
			result.push({
				...currentEntry,
				change: 0,
				direction: "",
			});
		}
	});

	return result;
}

main();
