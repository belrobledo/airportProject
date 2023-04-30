const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin & user routes
bookingRouter.post('/bookings', authenticate, bookingController.addBooking);

bookingRouter.get('/bookings/id/:idbooking', authenticate, bookingController.getBookingById); //get idUser from db

bookingRouter.get('/bookings/user/:iduser', authenticate, bookingController.getAllBookingsByUser); //get idUser from db


module.exports = bookingRouter;