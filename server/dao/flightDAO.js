const connection = require('../databases/connection');
const Flight = require('../models/flight');


function addFlight(idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddFlight(?, ?, ?, ?, ?, ?, ?, ?);', [idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getFlightById(idFlight) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetFlightById(?);', idFlight, (error, results) => {
      if (error) {
        reject(error);
      }
      
      let flight;
      if(results[0] && results[0].length){
        flight = new Flight(results[0][0].idFlight, results[0][0].idAirportOrigin, results[0][0].idAirportDestination, results[0][0].departureTime, results[0][0].distance, results[0][0].duration, results[0][0].price, results[0][0].airline, results[0][0].model, results[0][0].capacity);
      }
      resolve(flight);
    });
  });
}

function getAllFlights() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllFlights();', (error, results) => {
      if (error) {
        reject(error);
      }

      let flights = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let flight = new Flight(result.idFlight, result.idAirportOrigin, result.idAirportDestination, result.departureTime, result.distance, result.duration, result.price, result.airline, result.model, result.capacity);
          flights.push(flight);
        });
      }
      resolve(flights);
    });
  });
}

function getAllFlightsByOrigin(origin, departure) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllFlightsByOrigin(?, ?);', [origin, departure], (error, results) => {
      if (error) {
        reject(error);
      }

      let flights = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let flight = new Flight(result.idFlight, result.idAirportOrigin, result.idAirportDestination, result.departureTime, result.distance, result.duration, result.price, result.airline, result.model, result.capacity);
          flights.push(flight);
        });
      }
      resolve(flights);
    });
  });
}

function getAllFlightsByDestination(destination, departure) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllFlightsByDestination(?, ?);', [destination, departure], (error, results) => {
      if (error) {
        reject(error);
      }

      let flights = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let flight = new Flight(result.idFlight, result.idAirportOrigin, result.idAirportDestination, result.departureTime, result.distance, result.duration, result.price, result.airline, result.model, result.capacity);
          flights.push(flight);
        });
      }
      resolve(flights);
    });
  });
}

function getAllFlightsByOriginAndDestination(origin, destination, departure) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllFlightsByOriginAndDestination(?, ?, ?);', [origin, destination, departure], (error, results) => {
      if (error) {
        reject(error);
      }

      let flights = [];
      if(results[0] && results[0].length){
        results[0].forEach(result => {
          let flight = new Flight(result.idFlight, result.idAirportOrigin, result.idAirportDestination, result.departureTime, result.distance, result.duration, result.price, result.airline, result.model, result.capacity);
          flights.push(flight);
        });
      }
      resolve(flights);
    });
  });
}

function updateFlight(idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateFlight(?, ?, ?, ?, ?, ?, ?, ?, ?);', [idFlight, idAirportOrigin, idAirportDestination, departureTime, distance, duration, price, airline, idAirplane], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}
  
function deleteFlight(idAirplane) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteFlight(?);', idAirplane, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
}

//only execute once when creating db
function loadFlights(){
  //departureTime: 'YYYY-MM-DD hh:mm:ss' | distance: kilometers | duration: minutes | price: USD float
  const flights = [{
    "idAirportOrigin": "BUE",
    "idAirportDestination": "NRT",
    "departureTime": "2023-12-26 19:30:00",
    "distance": 18362,
    "duration": 1830,
    "price": 1190,
    "airline": "Aerolineas Argentinas",
    "idAirplane": 2
  }, {
    "idAirportOrigin": "BUE",
    "idAirportDestination": "MAD",
    "departureTime": "2023-10-20 06:30:00",
    "distance": 10039,
    "duration": 753,
    "price": 790,
    "airline": "Iberia",
    "idAirplane": 1
  }, {
    "idAirportOrigin": "MAD",
    "idAirportDestination": "MSQ",
    "departureTime": "2023-10-20 23:00:00",
    "distance": 3403,
    "duration": 323,
    "price": 510,
    "airline": "Iberia",
    "idAirplane": 3
  }, {
    "idAirportOrigin": "NRT",
    "idAirportDestination": "BUE",
    "departureTime": "2023-12-29 09:10:00",
    "distance": 18362,
    "duration": 1830,
    "price": 1310,
    "airline": "Japan Airlines",
    "idAirplane": 4
  }, {
    "idAirportOrigin": "LHR",
    "idAirportDestination": "LAX",
    "departureTime": "2023-09-03 11:45:00",
    "distance": 8756,
    "duration": 628,
    "price": 398,
    "airline": "British Airways",
    "idAirplane": 2
  }, {
    "idAirportOrigin": "LHR",
    "idAirportDestination": "BER",
    "departureTime": "2023-10-06 21:20:00",
    "distance": 932,
    "duration": 100,
    "price": 137,
    "airline": "Lufthansa",
    "idAirplane": 3
  }, {
    "idAirportOrigin": "BER",
    "idAirportDestination": "MAD",
    "departureTime": "2023-10-17 01:30:00",
    "distance": 1869,
    "duration": 180,
    "price": 185,
    "airline": "Lufthansa",
    "idAirplane": 1
  }, {
    "idAirportOrigin": "MAD",
    "idAirportDestination": "BUE",
    "departureTime": "2023-10-17 06:30:00",
    "distance": 10045,
    "duration": 770,
    "price": 870,
    "airline": "Lufthansa",
    "idAirplane": 1
  }, {
    "idAirportOrigin": "BUE",
    "idAirportDestination": "MDQ",
    "departureTime": "2023-10-17 22:45:00",
    "distance": 450,
    "duration": 65,
    "price": 92,
    "airline": "Aerolineas Argentinas",
    "idAirplane": 2
  }]
  
  const sqlQuery = 'CALL spAddFlight(?, ?, ?, ?, ?, ?, ?, ?);';

  flights.forEach(flight => {
    connection.query(sqlQuery, [flight.idAirportOrigin, flight.idAirportDestination, flight.departureTime, flight.distance, flight.duration, flight.price, flight.airline, flight.idAirplane], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { 
    addFlight, 
    getFlightById, 
    getAllFlights, 
    getAllFlightsByOrigin, 
    getAllFlightsByDestination, 
    getAllFlightsByOriginAndDestination, 
    updateFlight, 
    deleteFlight, 
    loadFlights 
};