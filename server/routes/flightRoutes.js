const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/flightController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin & all users routes
flightRouter.get('/flights/id/:idflight', authenticate, flightController.getFlightById);

flightRouter.get('/flights', authenticate, flightController.getAllFlights);

flightRouter.get('/flights/origin', authenticate, flightController.getAllFlightsByOrigin);

flightRouter.get('/flights/destination', authenticate, flightController.getAllFlightsByDestination);

flightRouter.get('/flights/origindestination', authenticate, flightController.getAllFlightsByOriginAndDestination);

//protected admin routes
flightRouter.post('/flights', authenticate, flightController.addFlight);

flightRouter.put('/flights', authenticate, flightController.updateFlight);

flightRouter.delete('/flights/:idflight', authenticate, flightController.deleteFlight);


module.exports = flightRouter;