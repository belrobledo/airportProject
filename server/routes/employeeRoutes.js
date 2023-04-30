const express = require('express');
const employeeRouter = express.Router();
const employeeController = require('../controllers/employeeController');
const authenticate = require('../middlewares/authMiddleware');


//protected admin routes
employeeRouter.post('/employees', authenticate, employeeController.addEmployee);

employeeRouter.get('/employees/id/:idemployee', authenticate, employeeController.getEmployeeById);

employeeRouter.get('/employees', authenticate, employeeController.getAllEmployees);

employeeRouter.get('/employees/airport/:idairport', authenticate, employeeController.getAllEmployeesByAirport);

employeeRouter.put('/employees', authenticate, employeeController.updateEmployee);

employeeRouter.delete('/employees/:idemployee', authenticate, employeeController.deleteEmployee);


module.exports = employeeRouter;