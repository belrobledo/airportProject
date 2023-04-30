const connection = require('../databases/connection');


function getAllCountries() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllCountries();', (error, results) => {
      if (error) {
        reject(error);
      }

      let countries = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let country = { name:  result.name };
          countries.push(country);
        });
      }
      resolve(countries);
    });
  });
}

function getAllCities() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllCities();', (error, results) => {
      if (error) {
        reject(error);
      }

      let cities = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let city = { name: result.name, postalCode: result.postalCode, country: result.country };
          cities.push(city);
        });
      }
      resolve(cities);
    });
  });
}

//only execute once when creating db
function loadCountries(){
  const countries = [
    "Argentina",
    "Australia",
    "Belarus",
    "Brazil",
    "Canada",
    "China",
    "Colombia",
    "England",
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
    connection.query('CALL spAddCountry(?);', country, (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}

function loadCities(){
  const cities = [{
    "name": "Buenos Aires",
    "postalCode": "1802",
    "country": "Argentina"
  }, {
    "name": "London",
    "postalCode": "N17 9EZ",
    "country": "England"
  }, {
    "name": "Tokyo",
    "postalCode": "100-0005",
    "country": "Japan"
  }, {
    "name": "Madrid",
    "postalCode": "28292",
    "country": "Spain"
  }, {
    "name": "Berlin",
    "postalCode": "10117",
    "country": "Germany"
  }, {
    "name": "Los Angeles",
    "postalCode": "90002",
    "country": "United States"
  }, {
    "name": "Minsk",
    "postalCode": "220004",
    "country": "Belarus"
  }, {
    "name": "Mar Del Plata",
    "postalCode": "7600",
    "country": "Argentina"
  }]

  cities.forEach(city => {
    connection.query('CALL spAddCity(?, ?, ?);', [city.name, city.postalCode, city.country], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { getAllCountries, getAllCities, loadCountries, loadCities };