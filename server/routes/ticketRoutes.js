const express = require('express');
const ticketRouter = express.Router();
const ticketController = require('../controllers/ticketController');
const { authenticate, authorizeAdmin, authorizeBoth } = require('../middlewares/authMiddleware');


//protected admin & user routes
ticketRouter.get('/tickets/id/:idticket', authenticate, authorizeBoth, ticketController.getTicketById);

ticketRouter.get('/tickets/booking/:idbooking', authenticate, authorizeBoth, ticketController.getAllTicketsByBooking);

ticketRouter.get('/tickets/user/:iduser', authenticate, authorizeBoth, ticketController.getAllTicketsByUser);


//protected admin routes
ticketRouter.post('/tickets', authenticate, authorizeAdmin, ticketController.addTicket);

ticketRouter.get('/tickets/flight/:idflight', authenticate, authorizeAdmin, ticketController.getAllTicketsByFlight);

ticketRouter.put('/tickets', authenticate, authorizeAdmin, ticketController.updateTicket);

ticketRouter.delete('/tickets/:idticket', authenticate, authorizeAdmin, ticketController.deleteTicket);


module.exports = ticketRouter;