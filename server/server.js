require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(process.env.ROOT_PATH + '/views/index.html');
})

app.use(router);

app.listen(port);