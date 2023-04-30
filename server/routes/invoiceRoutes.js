const express = require('express');
const invoiceRouter = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin & user routes
invoiceRouter.get('/invoices/id/:idinvoice', authenticate, invoiceController.getInvoiceById); //get idUser from db

invoiceRouter.get('/invoices/booking/:idbooking', authenticate, invoiceController.getInvoiceByBooking); //get idUser from db

invoiceRouter.get('/invoices/user/:iduser', authenticate, invoiceController.getAllInvoicesByUser);


//protected admin routes
invoiceRouter.get('/invoices', authenticate, invoiceController.getAllInvoices);


module.exports = invoiceRouter;