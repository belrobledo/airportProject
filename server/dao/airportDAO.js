const connection = require('../databases/connection');
const Airport = require('../models/airport');


function addAirport(idAirport, name, addressLine1, addressLine2, city) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddAirport(?, ?, ?, ?, ?);', [idAirport, name, addressLine1, addressLine2, city], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getAirportById(idAirport) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAirportById(?);', idAirport, (error, results) => {
      if (error) {
        reject(error);
      }

      let airport;
      if(results && results[0].length){
        airport = new Airport(results[0][0].idAirport, results[0][0].name, results[0][0].idAddress, results[0][0].addressLine1, results[0][0].addressLine2, results[0][0].city, results[0][0].postalCode, results[0][0].country);
      }
      resolve(airport);
    });
  });
}

function getAirportByCity(city) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAirportByCity(?);', city, (error, results) => {
      if (error) {
        reject(error);
      }

      let airport;
      if(results && results[0].length){
        airport = new Airport(results[0][0].idAirport, results[0][0].name, results[0][0].idAddress, results[0][0].addressLine1, results[0][0].addressLine2, results[0][0].city, results[0][0].postalCode, results[0][0].country);
      }
      resolve(airport);
    });
  });
}

function getAllAirports() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllAirports();', (error, results) => {
      if (error) {
        reject(error);
      }

      let airports = [];
      if(results && results[0].length){
        results[0].forEach(result => {
          let airport = new Airport(result.idAirport, result.name, result.idAddress, result.addressLine1, result.addressLine2, result.city, result.postalCode, result.country);
          airports.push(airport);
        });
      }
      resolve(airports);
    });
  });
}

function updateAirport(idAirport, name, idAddress, addressLine1, addressLine2, city) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateAirport(?, ?, ?, ?, ?, ?);', [idAirport, name, idAddress, addressLine1, addressLine2, city], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }
  
  function deleteAirport(idAirport) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteAirport(?);', idAirport, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }

//only execute once when creating db
function loadAirports(){
  const airports = [{
    "idAirport": "BUE",
    "name": "Aeropuerto Internacional Ezeiza",
    "addressLine1": "Autopista Teniente General Ricchieri",
    "addressLine2": "KM. 33,5",
    "city": "Buenos Aires"
  }, {
    "idAirport": "LHR",
    "name": "London-Heathrow Airport",
    "addressLine1": "Nelson Road, Hounslow Middlesex, TW6 2GW",
    "addressLine2": "The Compass Centre",
    "city": "London"
  }, {
    "idAirport": "LAX",
    "name": "Los Angeles International Airport",
    "addressLine1": "1 World Way",
    "addressLine2": "",
    "city": "Los Angeles"
  }, {
    "idAirport": "NRT",
    "name": "Narita International Airport",
    "addressLine1": "1-1 Furugome, Narita",
    "addressLine2": "Chiba 282-0004",
    "city": "Tokyo"
  }, {
    "idAirport": "BER",
    "name": "Berlin Brandenburg Airport",
    "addressLine1": "Melli-Beese-Ring 1",
    "addressLine2": "12529 Schönefeld",
    "city": "Berlin"
  }, {
    "idAirport": "MAD",
    "name": "Aeropuerto Adolfo Suárez Madrid-Barajas",
    "addressLine1": "Av. de la Hispanidad",
    "addressLine2": "s/n, 28042",
    "city": "Madrid"
  }, {
    "idAirport": "MSQ",
    "name": "Minsk National Airport",
    "addressLine1": "M2 Minsk 220054",
    "addressLine2": "",
    "city": "Minsk"
  }, {
    "idAirport": "MDQ",
    "name": "Aeropuerto Internacional Astor Piazzolla",
    "addressLine1": "Autovia 2",
    "addressLine2": "Km 398.5",
    "city": "Mar Del Plata"
  }]

  airports.forEach(airport => {
    connection.query('CALL spAddAirport(?, ?, ?, ?, ?);', [airport.idAirport, airport.name, airport.addressLine1, airport.addressLine2, airport.city], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { addAirport, getAirportById, getAirportByCity, getAllAirports, updateAirport, deleteAirport, loadAirports };