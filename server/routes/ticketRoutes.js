const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controllers/ticketController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin & user routes
ticketRouter.get('/tickets/id/:idticket', authenticate, ticketController.getTicketById); //get idUser from db

ticketRouter.get('/tickets/booking/:idbooking', authenticate, ticketController.getAllTicketsByBooking); //get idUser from db

ticketRouter.get('/tickets/user/:iduser', authenticate, ticketController.getAllTicketsByUser);


//protected admin routes
ticketRouter.post('/tickets', authenticate, ticketController.addTicket);

ticketRouter.get('/tickets/flight/:idflight', authenticate, ticketController.getAllTicketsByFlight);

ticketRouter.put('/tickets', authenticate, ticketController.updateTicket);

ticketRouter.delete('/tickets/:idticket', authenticate, ticketController.deleteTicket);


module.exports = ticketRouter;