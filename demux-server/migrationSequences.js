const { Migration } = require("demux-postgres")

const createSentimentTypesTable = new Migration(
  "createSentimentTypesTable", // name
  "public", // schema
  "create_sentiment_types_table.sql", // SQL file
)
const fillSentimentTypesTable = new Migration(
  "fillSentimentTypesTable", // name
  "public", // schema
  "fill_sentiment_types_table.sql", // SQL file
)

const createSentimentEventsTable = new Migration(
  "createSentimentEventsTable", // name
  "public", // schema
  "create_sentiment_events_table.sql", // SQL file
)


const createTelosChessTable = new Migration(
  "createTelosChessTable", // name
  "public", // schema
  "create_telos_chess_table.sql", // SQL file
)


// MigrationSequence[]
// See: https://github.com/EOSIO/demux-js-postgres/blob/develop/src/interfaces.ts
module.exports = [{
  migrations: [
    createSentimentTypesTable,
    fillSentimentTypesTable,
    createSentimentEventsTable,
    createTelosChessTable
  ],
  sequenceName: "init"
}]
