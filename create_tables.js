const { log, LogType, logException } = require("@themysterys/pretty-log");
const { createClient } = require("@clickhouse/client");
const leaderboards = require("./leaderboards.json");

const client = createClient({
	url: process.env.CLICKHOUSE_URL,
	password: process.env.CLICKHOUSE_PASSWORD,
	username: process.env.CLICKHOUSE_USER,
	database: "mcci",
});

const mainTables = [
	"trophies",
	"trophies_skill",
	"trophies_style",
	"trophies_bonus",
	"trophies_fishing",
	"royal_reputation",
];

async function createGameTable(game) {
	let table_name = `leaderboard_${game}`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts          DateTime('UTC') DEFAULT now(),
        statistic 	String,
        uuid 		Nullable(String),
        username    Nullable(String),
        ranks       Array(String),
        Value       Int64,
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

async function createMainTable(stat) {
	let table_name = `leaderboard_${stat}`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts          DateTime('UTC') DEFAULT now(),
        uuid 		String,
        username    String,
        ranks       Array(String),
        Value       Int64,
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

async function createFactionTable() {
	let table_name = `leaderboard_factions`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        ts          DateTime('UTC') DEFAULT now(),
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
        ts         DateTime('UTC') DEFAULT now(),
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

async function createExchangeTable() {
	let table_name = `island_exchange`;
	let ddl = `
	CREATE TABLE IF NOT EXISTS ${table_name} (
        identifier	UUID,
		name		String,
		rarity		String,
		type		String,
		amount		Int32,
		cost		Int64,
		endTime		DateTime('UTC')
    )
    ENGINE = ReplacingMergeTree
    PARTITION BY toYYYYMMDD(endTime)
    ORDER BY (identifier, endTime, name)
	`;

	await client.exec({
		query: ddl,
	});
	log(`Ensured table exists: ${table_name}`, LogType.SUCCESS);
}

async function main() {
	log("Connected to Clickhouse", LogType.NETWORK);

	/* for (const game in leaderboards) {
		await createGameTable(game);
	}
	for (const stat of mainTables) {
		await createMainTable(stat);
	}
	await createFactionTable();
	await createFactionPlayersTable(); */
	await createExchangeTable();
	await client.close();
}

main();
