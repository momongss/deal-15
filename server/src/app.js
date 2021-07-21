const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const config = require('./config/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger(config.env === 'development' ? 'dev' : 'combined'));
app.use(cors());

// api routing
const apiV1Router = require('./route/api/v1');
app.use('/api/v1', apiV1Router);

module.exports = app;
