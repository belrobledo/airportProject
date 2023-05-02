require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/authRoutes');
const countryRouter = require('./routes/countryRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(process.env.ROOT_PATH + '/views/index.html');
})

app.use(authRouter);
app.use(countryRouter);

app.listen(port);