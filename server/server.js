//imports
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./logger/logging');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    logger.info('mongoDB database Connections established Successfully');
});
app.listen(port, () => {
    logger.info(`Server is running on http://localhost: ${port}`);
});

const cafe_route = require('./routes/cafe_route');
const employee_route = require('./routes/employee_route');

app.use('/api/v1/cafe', cafe_route);
app.use('/api/v1/employee', employee_route);

