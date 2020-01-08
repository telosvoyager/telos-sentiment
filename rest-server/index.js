const app = require('./app');
const config = require('../config');

app.listen(config.restApi.port, () => console.log(`Sentiment Token API server running on port ${config.restApi.port}`));
