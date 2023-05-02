const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const { authenticate, notAunthenticated, authorizeAdmin, authorizeUser, authorizeBoth } = require('../middlewares/authMiddleware');


//unprotected routes
userRouter.post('/users', notAunthenticated, userController.addUser);


//protected admin & user routes
userRouter.get('/users/id/:iduser', authenticate, authorizeBoth, userController.getUserById);

userRouter.get('/users/booking/:idbooking', authenticate, authorizeBoth, userController.getUserByBooking);


//protected user routes
userRouter.put('/users', authenticate, authorizeUser, userController.updateUser);

userRouter.put('/users/password', authenticate, authorizeUser, userController.updateUserPassword);


//protected admin routes
userRouter.get('/users', authenticate, authorizeAdmin, userController.getAllUsers);

userRouter.delete('/users/:iduser', authenticate, authorizeAdmin, userController.deleteUser);


module.exports = userRouter;