const { log, LogType, logException } = require("@themysterys/pretty-log");
const { createClient } = require("@clickhouse/client");
const leaderboards = require("./leaderboards.json");

const client = createClient({
	url: process.env.CLICKHOUSE_URL,
	password: process.env.CLICKHOUSE_PASSWORD,
	username: process.env.CLICKHOUSE_USER,
	database: "mcci",
});

async function createGameTable(game) {
	let table_name = `leaderboard_${game}`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts          DateTime DEFAULT now(),
        statistic 	String,
        uuid 		Nullable(String),
        username    Nullable(String),
        ranks       Array(String),
        value       Int64,
        rank        Int32
    )
    ENGINE = MergeTree
    PARTITION BY toYYYYMMDD(ts)
    ORDER BY (statistic, ts, rank)
	`;

	await client.exec({
		query: ddl,
	});
	log(`Ensured table exists: ${table_name}`, LogType.SUCCESS);
}

async function createFactionTable() {
	let table_name = `leaderboard_factions`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts          DateTime DEFAULT now(),
        faction     String, 
        value       Int32,
        rank        Int32
    )
    ENGINE = MergeTree
    PARTITION BY toYYYYMMDD(ts)
    ORDER BY (ts, rank)
	`;

	await client.exec({
		query: ddl,
	});
	log(`Ensured table exists: ${table_name}`, LogType.SUCCESS);
}

async function createFactionPlayersTable() {
	let table_name = `leaderboard_factions_players`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts         DateTime DEFAULT now(),
        faction    String,
        uuid       String,
        username   String,
		ranks	   Array(String),
        rank       Int32,
        value      Int64
    )
    ENGINE = MergeTree
    PARTITION BY toYYYYMMDD(ts)
    ORDER BY (ts, faction, rank);
	`;

	await client.exec({
		query: ddl,
	});
	log(`Ensured table exists: ${table_name}`, LogType.SUCCESS);
}

async function main() {
	log("Connected to Clickhouse", LogType.NETWORK);

	for (let game in leaderboards) {
		await createGameTable(game);
	}
	await createFactionTable()
	await createFactionPlayersTable()
	await client.close()
}

main();
