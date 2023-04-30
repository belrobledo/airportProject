const express = require('express');
const airportRouter = express.Router();
const airportController = require('../controllers/airportController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin & user routes
airportRouter.get('/airports/id/:idairport', authenticate, airportController.getAirportById);

airportRouter.get('/airports/city/:city', authenticate, airportController.getAirportByCity);

airportRouter.get('/airports', authenticate, airportController.getAllAirports);


//protected admin routes
airportRouter.post('/airports', authenticate, airportController.addAirport);

airportRouter.put('/airports', authenticate, airportController.updateAirport);

airportRouter.delete('/airports', authenticate, airportController.deleteAirport);


module.exports = airportRouter;