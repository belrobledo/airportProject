const connection = require('../databases/connection');
const Country = require('../models/country');


const tableName = "country";


function addCountry(name) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddCountry(?);', name, (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getCountryById(idCountry) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetCountryById(?);', idCountry, (error, results) => {
      if (error) {
        reject(error);
      }

      let country;
      if(results[0] && results[0].length){
        country = new Country(results[0][0].idCountry, results[0][0].name);
      }
      resolve(country);
    });
  });
}

function getCountryByName(name) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetCountryByName(?);', name, (error, results) => {
      if (error) {
        reject(error);
      }

      let country;
      if(results[0] && results[0].length){
        country = new Country(results[0][0].idCountry, results[0][0].name);
      }
      resolve(country);
    });
  });
}

function getAllCountries() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllCountries();', (error, results) => {
      if (error) {
        reject(error);
      }

      let countries = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let country = new Country(result.idCountry, result.name);
          countries.push(country);
        });
      }
      resolve(countries);
    });
  });
}

function populateTable(){
  //delete this
  countries = [
    "Argentina",
    "Australia",
    "Belarus",
    "Brazil",
    "Canada",
    "China",
    "Colombia",
    "France",
    "Germany",
    "Italy",
    "Japan",
    "Korea",
    "Mexico",
    "Poland",
    "Portugal",
    "Saudi Arabia",
    "Spain",
    "Ukraine",
    "United States",
    "Russia"
  ]

  countries.forEach(country => {
    connection.query('INSERT INTO ' + tableName + ' (name) VALUES (?);', country, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { addCountry, getCountryById, getCountryByName, getAllCountries, populateTable };