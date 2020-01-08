const config = {
  demux: {
    startAtBlock: 1,
    onlyIrreversible: false,
    nodeosEndpoint: "http://127.0.0.1:4888"
  },
  restApi: {
    port: 4000,
  },
  db: {
    host: 'localhost',
    port: 5432,
    database: 'telos',
    schema: 'public',
    user: 'jh',
    password: 'password',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }
};

module.exports = config;
