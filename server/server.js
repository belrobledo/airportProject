const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/authRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile('views/index.html', {root: __dirname});
})

app.use(router);

app.listen(port);