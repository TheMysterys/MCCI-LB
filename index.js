const { MongoClient } = require("mongodb");
const { getFishing, getCrown } = require("./emojis");
const { log, LogType } = require("@themysterys/pretty-log");

const client = new MongoClient(process.env.MONGO_URI);

const crowns = [
	"<:CROWN:1122664056160010323>",
	"<:1_:1313736388872507484>",
	"<:5_:1313736416316096532>",
];

const query = `query Leaderboard($key: String!) {
  statistic(key: $key) {
    leaderboard(amount: 20) {
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
	reputation: {
		statistic: "royal_reputation",
		title: "Royal Reputation Leaderboard",
		color: 0x882fa9,
	},
	fishing: {
		statistic: "trophies_fishing",
		title: "Fishing Leaderboard",
		color: 0x46c8d3,
	},
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
	log("Closed connection to MongoDB", LogType.NETWORK)
}

async function updateLeaderboard(db, leaderboard_key) {
	// Get webhook url from .env
	const webhookUrl = process.env[leaderboard_key.toUpperCase()];
	const collection = db.collection("leaderboards");
	const leaderboard = leaderboards[leaderboard_key];

	// get past leaderboard
	const pastLeaderboard = await collection.findOne({ type: leaderboard_key });

	// get current leaderboard
	const request = await fetch("https://api.mccisland.net/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Trophy Hunters Leaderboards",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query,
			variables: { key: leaderboard.statistic },
		}),
	});

	const data = await request.json();
	let error = false; 

	if (request.status !== 200) {
		log(`MCC Island API returned status: ${request.status}`, LogType.ERROR);
		console.error(data)
		error = true;
	}

	if (data.errors) {
		log(`${data.errors.length} Error(s) with request`, LogType.ERROR)
		for (let i = 0; i < data.errors.length; i++) {
			log(`Error ${i+1}: ${data.errors[i].message}`, LogType.ERROR)
		}
		error = true;
	}

	if (error) {
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
							data.error,
							"Please contact TheMysterys",
						].join("\n"),
						color: 0xff0000,
					},
				],
			}),
		});
		return;
	}

	const leaderboardData = data.data.statistic.leaderboard

	// Get movement of each player
	const result = getMovement(pastLeaderboard.leaderboard, leaderboardData);

	const embed = {
		title: leaderboard.title,
		color: leaderboard.color,
		description: result
			.map((entry) => {
				if (leaderboard_key === "overall") {
					return `${
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank >= 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username.replaceAll("_","\\_")
					} ${getCrown(
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
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank >= 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username.replaceAll("_","\\_")
					} ${getFishing(
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
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank >= 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username.replaceAll("_","\\_")
					} - ${entry.value.toLocaleString()} ${
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

	await fetch(webhookUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			embeds: [embed],
		}),
	});

	// Update leaderboard in database
	await collection.updateOne(
		{ type: leaderboard_key },
		{
			$set: {
				leaderboard: leaderboardData,
			},
		}
	);
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
