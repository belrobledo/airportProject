const { loadCities, loadCountries } = require('../dao/locationDAO');
const { loadAirports } = require('../dao/airportDAO');
const { loadEmployees } = require('../dao/employeeDAO');
const { loadAirplanes } = require('../dao/airplaneDAO');
const { loadFlights } = require('../dao/flightDAO');
const { loadUsers } = require('../dao/userDAO');

loadCountries();
loadCities();
loadAirports();
loadEmployees();
loadAirplanes();
loadFlights();
loadUsers();


//Only execute once when creating the db for testing purposes.