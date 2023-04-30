const express = require('express');
const airplaneRouter = express.Router();
const airplaneController = require('../controllers/airplaneController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');


//protected admin routes
airplaneRouter.post('/airplanes', authenticate, authorizeAdmin, airplaneController.addAirplane);

airplaneRouter.get('/airplanes/id/:idairplane', authenticate, authorizeAdmin, airplaneController.getAirplaneById);

airplaneRouter.get('/airplanes/model/:airplanemodel', authenticate, authorizeAdmin, airplaneController.getAirplaneByModel);

airplaneRouter.get('/airplanes', authenticate, authorizeAdmin, airplaneController.getAllAirplanes);

airplaneRouter.put('/airplanes', authenticate, authorizeAdmin, airplaneController.updateAirplane);

airplaneRouter.delete('/airplanes/:idairplane', authenticate, authorizeAdmin, airplaneController.deleteAirplane);


module.exports = airplaneRouter;