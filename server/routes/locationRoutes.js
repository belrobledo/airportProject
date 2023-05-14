const express = require('express');
const locationRouter = express.Router();
const locationController = require('../controllers/locationController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');


//protected admin routes
locationRouter.get('/countries', authenticate, authorizeAdmin, locationController.getAllCountries);

locationRouter.get('/cities', authenticate, authorizeAdmin, locationController.getAllCities);


module.exports = locationRouter;