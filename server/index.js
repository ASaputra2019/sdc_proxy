const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const router = require('./router.js');
const db = require('../database/index.js');

const app = express();

const port = 3002;

app.use(bodyParser.json());
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));