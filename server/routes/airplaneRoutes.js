const express = require('express');
const airplaneRouter = express.Router();
const airplaneController = require('../controllers/airplaneController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin routes
airplaneRouter.post('/airplanes', authenticate, airplaneController.addAirplane);

airplaneRouter.get('/airplanes/id/:idairplane', authenticate, airplaneController.getAirplaneById);

airplaneRouter.get('/airplanes/model/:airplanemodel', authenticate, airplaneController.getAirplaneByModel);

airplaneRouter.get('/airplanes', authenticate, airplaneController.getAllAirplanes);

airplaneRouter.put('/airplanes', authenticate, airplaneController.updateAirplane);

airplaneRouter.delete('/airplanes/:idairplane', authenticate, airplaneController.deleteAirplane);


module.exports = airplaneRouter;