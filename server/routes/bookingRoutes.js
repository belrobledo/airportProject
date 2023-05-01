const express = require('express');
const bookingRouter = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate, authorizeBoth } = require('../middlewares/authMiddleware');


//protected admin & user routes
//bookingRouter.post('/bookings', authenticate, authorizeBoth, bookingController.addBooking);
bookingRouter.post('/bookings', authenticate, authorizeBoth, bookingController.addBookingTransaction);

bookingRouter.get('/bookings/id/:idbooking', authenticate, authorizeBoth, bookingController.getBookingById);

bookingRouter.get('/bookings/user/:iduser', authenticate, authorizeBoth, bookingController.getAllBookingsByUser);


module.exports = bookingRouter;