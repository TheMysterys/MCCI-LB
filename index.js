const { MongoClient } = require("mongodb");
const { getFishing, getCrown } = require("./emojis");

const client = new MongoClient(process.env.MONGO_URI);

const crowns = [
	"<:CROWN:1122664056160010323>",
	"<:1_:1313736388872507484>",
	"<:5_:1313736416316096532>",
];

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

	console.log("Connected to MongoDB");

	for (const leaderboard_key in leaderboards) {
		console.log("Updating:", leaderboard_key);
		await updateLeaderboard(db, leaderboard_key);
	}
}

async function updateLeaderboard(db, leaderboard_key) {
	// Get webhook url from .env
	const webhookUrl = process.env[leaderboard_key.toUpperCase()];
	const collection = db.collection("leaderboards");
	const leaderboard = leaderboards[leaderboard_key];

	// get past leaderboard
	const pastLeaderboard = await collection.findOne({ type: leaderboard_key });

	// get current leaderboard
	const request = await fetch("https://api.islandstats.xyz/leaderboard", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"User-Agent": "Trophy Hunters Bot",
			"API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			stat: leaderboard.statistic,
		}),
	});

	const data = await request.json();

	if (data.success === false) {
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

	const top10 = data.data.slice(0, 10);

	// Get movement of each player
	const result = getMovement(pastLeaderboard.leaderboard, top10);

	const embed = {
		title: leaderboard.title,
		color: leaderboard.color,
		description: result
			.map((entry) => {
				if (leaderboard_key === "overall") {
					return `${
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank != 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username
					} ${getCrown(entry.player.levels.crownLevel.evolution)} - ${
						entry.value
					} ${
						entry.change
							? `(${entry.change > 0 ? "+" : ""}${entry.change})`
							: ""
					}`;
				} else if (leaderboard_key === "fishing") {
					return `${
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank != 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username
					} ${getFishing(
						entry.player.levels.fishingLevel.evolution
					)} - ${entry.value} ${
						entry.change
							? `(${entry.change > 0 ? "+" : ""}${entry.change})`
							: ""
					}`;
				} else {
					return `${
						crowns[entry.rank - 1] || "<:__:1338300480501321760>"
					}**#${
						entry.rank != 10
							? "\u00A0\u00A0" + entry.rank
							: entry.rank
					}** ${entry.direction || "<:__:1338300480501321760>"} - ${
						entry.player.username
					} - ${entry.value} ${
						entry.change
							? `(${entry.change > 0 ? "+" : ""}${entry.change})`
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
				leaderboard: top10,
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
