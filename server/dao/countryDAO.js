const connection = require('../databases/connection');
const Country = require('../models/country');

const tableName = "country";


// function addCountry(country){
//   connection.query('INSERT INTO ' + tableName + ' (name) VALUES (?);', country, (error, results) => {
//     if (error) {
//       console.error('Error executing query:', error);
//         return;
//       }
//       console.log('Insert result', results);
//     });
// }

function addCountry(country){
  connection.query('CALL spAddCountry(?);', country, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
        return;
      }
      console.log('Insert result', results);
    });
}

// function getCountryByName(name) {
//   return new Promise((resolve, reject) => {
//     connection.query('SELECT * FROM ' + tableName + ' WHERE name = ?;', name, (error, results) => {
//       if (error) {
//         reject(error);
//       }

//       let country;
//       if(results.length > 0){
//         country = new Country(results[0].idCountry, results[0].name);
//       }
//       resolve(country);
//     });
//   });
// }

function getCountryByName(name) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetCountryByName(?);', name, (error, results) => {
      if (error) {
        reject(error);
      }

      let country;
      if(results[0].length > 0){
        country = new Country(results[0].idCountry, results[0].name);
      }
      resolve(country);
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

module.exports = { getCountryByName, addCountry };