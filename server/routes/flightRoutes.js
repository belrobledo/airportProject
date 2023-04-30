const express = require('express');
const flightRouter = express.Router();
const flightController = require('../controllers/flightController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');


//protected all users routes
flightRouter.get('/flights/id/:idflight', authenticate, flightController.getFlightById);

flightRouter.get('/flights', authenticate, flightController.getAllFlights);

flightRouter.get('/flights/origin', authenticate, flightController.getAllFlightsByOrigin);

flightRouter.get('/flights/destination', authenticate, flightController.getAllFlightsByDestination);

flightRouter.get('/flights/origindestination', authenticate, flightController.getAllFlightsByOriginAndDestination);

//protected admin routes
flightRouter.post('/flights', authenticate, authorizeAdmin, flightController.addFlight);

flightRouter.put('/flights', authenticate, authorizeAdmin, flightController.updateFlight);

flightRouter.delete('/flights/:idflight', authenticate, authorizeAdmin, flightController.deleteFlight);


module.exports = flightRouter;