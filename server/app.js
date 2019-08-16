// JS file for combining the routers into a single app and adding the view engine. 
const logger = require('@financial-times/n-logger').default;
const apiroutes = require('../routes/api-router');
const express = require('express');
const app = express();
logger.info({event: 'oms-methode-integration', type: 'app started'});

app.use('/', apiroutes);

module.exports = app;