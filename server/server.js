require('dotenv').config();
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API is up and running' });
});

app.use(routes);

//require only once after creating the db container
//require('./databases/populateTables');

app.listen(port);