const express = require('express');
const logger = require('morgan');

const config = require('./config/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger(config.env === 'development' ? 'dev' : 'combined'));

module.exports = app;
