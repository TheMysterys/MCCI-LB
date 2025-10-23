const { log, LogType, logException } = require("@themysterys/pretty-log");
const { exchangeQuery } = require("./query");

const { createClient } = require("@clickhouse/client");

const client = createClient({
	url: process.env.CLICKHOUSE_URL,
	password: process.env.CLICKHOUSE_PASSWORD,
	username: process.env.CLICKHOUSE_USER,
	database: "mcci",
	clickhouse_settings: {
		date_time_input_format: "best_effort",
	},
});

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
			"User-Agent": "Trophy Hunters Leaderboards",
			"X-API-Key": process.env.API_KEY,
		},
		body: JSON.stringify({
			query: exchangeQuery,
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
	log("Fetching Island Exchange listings from API");
	const { data, error } = await getLBData();

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
									"Island Exchange fetching will resume tomorrow",
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
								title: "Error Fetching Island Exchange listings",
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

	const soldListings = data.soldIslandExchangeListings;

	client.insert({
		table: "island_exchange",
		values: soldListings.map((listing) => ({
			identifier: listing.identifier,
			name: listing.asset.name,
			rarity: listing.asset.rarity,
			type: listing.asset.__typename,
			amount: listing.amount,
			cost: listing.cost,
			endTime: listing.endTime,
			creationTime: listing.creationTime,
		})),
		format: "JSONEachRow",
	});

	log(
		`Inserted ${soldListings.length} listings to Clickhouse.`,
		LogType.SUCCESS
	);
}

main();
