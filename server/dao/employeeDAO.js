const connection = require('../databases/connection');
const Employee = require('../models/employee');


function addEmployee(firstName, lastName, position, idAirport) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spAddEmployee(?, ?, ?, ?);', [firstName, lastName, position, idAirport], (error, results) => {
      if (error) {
        reject(error);
      }

      resolve(results);
      });
  });
}

function getEmployeeById(idEmployee) {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetEmployeeById(?);', idEmployee, (error, results) => {
      if (error) {
        reject(error);
      }

      let employee;
      if(results && results[0].length){
        employee = new Employee(results[0][0].idEmployee, results[0][0].firstName, results[0][0].lastName, results[0][0].position, results[0][0].idAirport);
      }
      resolve(employee);
    });
  });
}

function getAllEmployees() {
  return new Promise((resolve, reject) => {
    connection.query('CALL spGetAllEmployees();', (error, results) => {
      if (error) {
        reject(error);
      }

      let employees = [];
      if(results && results[0].length){
        results[0].forEach(result => {
          let employee = new Employee(result.idEmployee, result.firstName, result.lastName, result.position, result.idAirport);
          employees.push(employee);
        });
      }
      resolve(employees);
    });
  });
}

function getAllEmployeesByAirport(idAirport) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spGetAllEmployeesByAirport(?);', idAirport, (error, results) => {
        if (error) {
          reject(error);
        }
  
        let employees = [];
        if(results && results[0].length){
          results[0].forEach(result => {
            let employee = new Employee(result.idEmployee, result.firstName, result.lastName, result.position, result.idAirport);
            employees.push(employee);
          });
        }
        resolve(employees);
      });
    });
  }

function updateEmployee(idEmployee, firstName, lastName, position, idAirport) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spUpdateEmployee(?, ?, ?, ?, ?);', [idEmployee, firstName, lastName, position, idAirport], (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }
  
  function deleteEmployee(idEmployee) {
    return new Promise((resolve, reject) => {
      connection.query('CALL spDeleteEmployee(?);', idEmployee, (error, results) => {
        if (error) {
          reject(error);
        }
  
        resolve(results);
      });
    });
  }

//only execute once when creating db
function loadEmployees(){
  const employees = [{
    "firstName": "Christian",
    "lastName": "Zarate",
    "position": "Air Traffic Controller",
    "idAirport": "LHR",
    }, {
    "firstName": "Ricardo",
    "lastName": "Bardotelli",
    "position": "Avionics Technician",
    "idAirport": "BUE",
    }, {
    "firstName": "Hernan",
    "lastName": "Mekuncio",
    "position": "Flight Attendant",
    "idAirport": "LHR",
    }, {
    "firstName": "Lukas",
    "lastName": "Trevi",
    "position": "Reservation Agent",
    "idAirport": "LAX",
    }, {
    "firstName": "Luc",
    "lastName": "Kennedy",
    "position": "Reservation Agent",
    "idAirport": "NRT",
  }]

  employees.forEach(employee => {
    connection.query('CALL spAddEmployee(?, ?, ?, ?);', [employee.firstName, employee.lastName, employee.position, employee.idAirport], (error, results) => {
        if (error) {
          console.error('Error executing query:', error);
            return;
          }
          console.log('Insert result', results);
        });
  });
}


module.exports = { addEmployee, getEmployeeById, getAllEmployees, getAllEmployeesByAirport, updateEmployee, deleteEmployee, loadEmployees };