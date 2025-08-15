const { MongoClient } = require("mongodb");
const { getFishing, getCrown } = require("./emojis");
const { log, LogType, logException } = require("@themysterys/pretty-log");

const client = new MongoClient(process.env.MONGO_URI);

const crowns = [
	"<:CROWN:1122664056160010323>",
	"<:1_:1394998866461593710>",
	"<:5_:1394998874816385064>",
];

const query = `query Leaderboard($key: String!, $offset: Int!) {
  statistic(key: $key) {
    leaderboard(amount: 50, offset: $offset) {
      player {
        uuid
        username
        ranks
        levels: crownLevel {
          crownLevel: levelData {
            evolution
            level
          }
          fishingLevel: fishingLevelData {
            evolution
            level
          }
        }
      }
      rank
      value
    }
  }
}`;

const leaderboards = {
	overall: {
		statistic: "trophies",
		title: "Overall Trophy Leaderboard",
		color: 0xff738f,
	},
	skill: {
		statistic: "trophies_skill",
		title: "Skill Trophy Leaderboard",
		color: 0xff9f82,
	},
	style: {
		statistic: "trophies_style",
		title: "Style Trophy Leaderboard",
		color: 0xe86bff,
	},
	bonus: {
		statistic: "trophies_bonus",
		title: "Bonus Trophy Leaderboard",
		color: 0xaae0e0,
	},
	reputation: {
		statistic: "royal_reputation",
		title: "Royal Reputation Leaderboard",
		color: 0x882fa9,
	},
	fishing: {
		statistic: "trophies_fishing",
		title: "Fishing Leaderboard",
		color: 0x89daff,
	},
};

const APIErrors = {
	API_OFFLINE: 1, // API is offline
	UNKNOWN_STATUS: 2, // Returned a status that wasn't 200
	REQUEST_ERROR: 3, // Issue with request query
};

async function main() {
	await client.connect();
	const db = client.db("trophy-hunters");

	log("Connected to MongoDB", LogType.NETWORK);

	for (const leaderboard_key in leaderboards) {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		log(`Updating leaderboard: ${leaderboard_key}`);
		await updateLeaderboard(db, leaderboard_key);
	}
	client.close();
	log("Closed connection to MongoDB", LogType.NETWORK);
}

async function getLBData(leaderboard) {
	const request = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Trophy Hunters Leaderboards",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query,
			variables: { key: leaderboard.statistic, offset: 0 },
		}),
	});

	const request2 = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Trophy Hunters Leaderboards",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query,
			variables: { key: leaderboard.statistic, offset: 50 },
		}),
	});

	// Check if API down
	if (request.status === 502 || request2.status === 502) {
		log(`MCC Island API is currently down. Skipping...`, LogType.ERROR);
		return { data: null, error: APIErrors.API_OFFLINE };
	}

	let rawData, rawData2;

	try {
		rawData = await request.json();
		rawData2 = await request2.json();
	} catch (e) {
		logException(e);
		return { data: null, error: APIErrors.API_OFFLINE };
	}

	if (request.status !== 200 || request2.status !== 200) {
		log(`MCC Island API returned status: ${request.status}`, LogType.ERROR);
		console.error("Request 1:", rawData);
		console.error("Request 2:", rawData2);
		return { data: null, error: APIErrors.UNKNOWN_STATUS };
	}

	if (rawData.errors) {
		log(`${rawData.errors.length} Error(s) with request`, LogType.ERROR);
		for (let i = 0; i < rawData.errors.length; i++) {
			log(`Error ${i + 1}: ${rawData.errors[i].message}`, LogType.ERROR);
		}
		return { data: null, error: APIErrors.REQUEST_ERROR };
	}
	if (rawData2.errors) {
		log(`${rawData2.errors.length} Error(s) with request`, LogType.ERROR);
		for (let i = 0; i < rawData2.errors.length; i++) {
			log(`Error ${i + 1}: ${rawData2.errors[i].message}`, LogType.ERROR);
		}
		return { data: null, error: APIErrors.REQUEST_ERROR };
	}

	const leaderboardData1 = rawData.data.statistic.leaderboard;
	const leaderboardData2 = rawData2.data.statistic.leaderboard;

	const fullLeaderboard = [...leaderboardData1, ...leaderboardData2];

	return { data: fullLeaderboard, error: null };
}

async function updateLeaderboard(db, leaderboard_key) {
	const webhookUrls = process.env[leaderboard_key.toUpperCase()].split(",");
	const leaderboard = leaderboards[leaderboard_key];
	const collection = db.collection(`${leaderboard_key}_leaderboards`);

	// get past leaderboard
	const pastLeaderboardData = await collection
		.find()
		.sort({ date: -1 })
		.limit(1)
		.toArray();
	const pastDiscordLeaderboard =
		pastLeaderboardData[0]?.data.slice(0, 25) ?? [];

	const { data, error } = await getLBData(leaderboard);

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
										"Leaderboards will resume tomorrow",
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
								title: "Error Updating Leaderboard",
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

	const discordLeaderboard = data.slice(0, 25);

	// Get movement of each player
	const result = getMovement(
		pastDiscordLeaderboard,
		discordLeaderboard
	).slice(0, 20);

	const embed = {
		title: leaderboard.title,
		color: leaderboard.color,
		description: result
			.map((entry) => {
				if (leaderboard_key === "overall") {
					return `${
						crowns[entry.rank - 1] || "<:__:1394998791458787348>"
					}**#${
						entry.rank < 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${
						entry.direction || "<:__:1394998791458787348>"
					} - ${entry.player.username.replaceAll(
						"_",
						"\\_"
					)} ${getCrown(
						entry.player.levels.crownLevel.evolution
					)} - ${entry.value.toLocaleString()} ${
						entry.change
							? `(${
									entry.change > 0 ? "+" : ""
							  }${entry.change.toLocaleString()})`
							: ""
					}`;
				} else if (leaderboard_key === "fishing") {
					return `${
						crowns[entry.rank - 1] || "<:__:1394998791458787348>"
					}**#${
						entry.rank < 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${
						entry.direction || "<:__:1394998791458787348>"
					} - ${entry.player.username.replaceAll(
						"_",
						"\\_"
					)} ${getFishing(
						entry.player.levels.fishingLevel.evolution
					)} - ${entry.value.toLocaleString()} ${
						entry.change
							? `(${
									entry.change > 0 ? "+" : ""
							  }${entry.change.toLocaleString()})`
							: ""
					}`;
				} else {
					return `${
						crowns[entry.rank - 1] || "<:__:1394998791458787348>"
					}**#${
						entry.rank < 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${
						entry.direction || "<:__:1394998791458787348>"
					} - ${entry.player.username.replaceAll(
						"_",
						"\\_"
					)} - ${entry.value.toLocaleString()} ${
						entry.change
							? `(${
									entry.change > 0 ? "+" : ""
							  }${entry.change.toLocaleString()})`
							: ""
					}`;
				}
			})
			.join("\n"),
		footer: {
			text: "Last Updated",
		},
		timestamp: new Date(),
	};

	for (const webhookUrl of webhookUrls) {
		if (webhookUrl == "") continue;
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

	// Insert leaderboard in database for graphs
	await collection.insertOne({
		date: new Date(),
		data,
	});
}

function getMovement(pastLeaderboard, currentLeaderboard) {
	let result = [];

	currentLeaderboard.forEach((currentEntry) => {
		const currentPlayer = currentEntry.player;
		let pastEntry = pastLeaderboard.find(
			(entry) => entry.player.uuid === currentEntry.player.uuid
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
				direction: ":arrow_up:",
			});
		}
	});

	return result;
}

main();
