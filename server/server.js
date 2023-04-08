require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/authRoutes');

const { getCountryByName, addCountry } = require('./dao/countryDAO');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(process.env.ROOT_PATH + '/views/index.html');
})

function tryingGetCountry(){
    getCountryByName("Argentina").then( country => {
      (country) ? console.log("results: ", country) : console.log("Couldn't find a country with that name.");
    }).catch( err => {
      console.log("error: ", err);
    })
}

addCountry("Argentina");
tryingGetCountry();

app.use(router);

app.listen(port);