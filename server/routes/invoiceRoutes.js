const express = require('express');
const invoiceRouter = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate, authorizeAdmin, authorizeBoth } = require('../middlewares/authMiddleware');


//protected admin & user routes
invoiceRouter.get('/invoices/id/:idinvoice', authenticate, authorizeBoth, invoiceController.getInvoiceById);

invoiceRouter.get('/invoices/booking/:idbooking', authenticate, authorizeBoth, invoiceController.getInvoiceByBooking);

invoiceRouter.get('/invoices/user/:iduser', authenticate, authorizeBoth, invoiceController.getAllInvoicesByUser);


//protected admin routes
invoiceRouter.get('/invoices', authenticate, authorizeAdmin, invoiceController.getAllInvoices);


module.exports = invoiceRouter;