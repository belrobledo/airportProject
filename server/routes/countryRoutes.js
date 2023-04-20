const express = require('express');
const countryRouter = express.Router();
const countryController = require('../controllers/countryController');
const authenticate = require('../middlewares/authMiddleware');


//protected routes
countryRouter.post('/countries', authenticate, countryController.addCountry);

countryRouter.get('/countries/id/:idcountry', authenticate, countryController.getCountryById);

countryRouter.get('/countries/name/:countryname', authenticate, countryController.getCountryByName);

countryRouter.get('/countries', authenticate, countryController.getAllCountries);


module.exports = countryRouter;