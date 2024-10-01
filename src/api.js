const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const ApiRoutes = require('./routes/apiRoutes')

const app = express();
app.use(bodyParser.json());

const router = express.Router();
const apiRoutes = new ApiRoutes(router);

app.use('/.netlify/functions/api/v1', router);

module.exports = app;
module.exports.handler = serverless(app);