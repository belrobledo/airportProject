const express = require('express');
const config = require('./configs/config');
const bodyParser = require('body-parser');
const router = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(config.root + '/views/index.html');
})

app.use(router);

app.listen(port);