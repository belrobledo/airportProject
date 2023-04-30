const express = require('express');
const locationRouter = express.Router();
const locationController = require('../controllers/locationController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin routes
locationRouter.get('/countries', authenticate, locationController.getAllCountries);

locationRouter.get('/cities', authenticate, locationController.getAllCities);


module.exports = locationRouter;