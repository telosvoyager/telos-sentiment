const express = require('express');
const restRouter = require('./routes/rest');

const app = express();

app.use(express.json());
app.use(restRouter);

module.exports = app;
