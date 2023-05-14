const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticate, authorizeAdmin } = require('../middlewares/authMiddleware');


//protected admin routes
employeeRouter.post('/employees', authenticate, authorizeAdmin, employeeController.addEmployee);

employeeRouter.get('/employees/id/:idemployee', authenticate, authorizeAdmin, employeeController.getEmployeeById);

employeeRouter.get('/employees', authenticate, authorizeAdmin, employeeController.getAllEmployees);

employeeRouter.get('/employees/airport/:idairport', authenticate, authorizeAdmin, employeeController.getAllEmployeesByAirport);

employeeRouter.put('/employees', authenticate, authorizeAdmin, employeeController.updateEmployee);

employeeRouter.delete('/employees/:idemployee', authenticate, authorizeAdmin, employeeController.deleteEmployee);


module.exports = employeeRouter;