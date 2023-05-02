const connection = require('../databases/connection');
const Airplane = require('../models/airplane');


function addAirplane(model, capacity) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddAirplane(?, ?);', [model, capacity], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getAirplaneById(idAirplane) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAirplaneById(?);', idAirplane, (error, results) => {
      if (error) {
        reject(error);
      }

      let airplane;
      if(results && results[0].length){
        airplane = new Airplane(results[0][0].idAirplane, results[0][0].model, results[0][0].capacity);
      }
      resolve(airplane);
    });
  });
}

function getAirplaneByModel(model) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAirplaneByModel(?);', model, (error, results) => {
      if (error) {
        reject(error);
      }

      let airplane;
      if(results && results[0].length){
        airplane = new Airplane(results[0][0].idAirplane, results[0][0].model, results[0][0].capacity);
      }
      resolve(airplane);
    });
  });
}

function getAllAirplanes() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllAirplanes();', (error, results) => {
      if (error) {
        reject(error);
      }

      let airplanes = [];
      if(results && results[0].length){
        results[0].forEach(result => {
          let airplane = new Airplane(result.idAirplane, result.model, result.capacity);
          airplanes.push(airplane);
        });
      }
      resolve(airplanes);
    });
  });
}

function updateAirplane(idAirplane, model, capacity) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateAirplane(?, ?, ?);', [idAirplane, model, capacity], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }
  
  function deleteAirplane(idAirplane) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteAirplane(?);', idAirplane, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }

//only execute once when creating db
function loadAirplanes(){
  const airplanes = [{
    "model":  "Airbus A310",
    "capacity": 200
  }, {
    "model":  "Airbus A340",
    "capacity": 375
  }, {
    "model":  "Airbus A330",
    "capacity": 335
  }, {
    "model":  "Airbus A380",
    "capacity": 550 
  }]

  airplanes.forEach(airplane => {
    connection.query('CALL spAddAirplane(?, ?);', [airplane.model, airplane.capacity], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { addAirplane, getAirplaneById, getAirplaneByModel, getAllAirplanes, updateAirplane, deleteAirplane, loadAirplanes };