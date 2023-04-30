const express = require('express');
const airportRouter = express.Router();
const airportController = require('../controllers/airportController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');


//protected logged users routes
airportRouter.get('/airports/id/:idairport', authenticate, airportController.getAirportById);

airportRouter.get('/airports/city/:city', authenticate, airportController.getAirportByCity);

airportRouter.get('/airports', authenticate, airportController.getAllAirports);


//protected admin routes
airportRouter.post('/airports', authenticate, authorizeAdmin, airportController.addAirport);

airportRouter.put('/airports', authenticate, authorizeAdmin, airportController.updateAirport);

airportRouter.delete('/airports', authenticate, authorizeAdmin, airportController.deleteAirport);


module.exports = airportRouter;