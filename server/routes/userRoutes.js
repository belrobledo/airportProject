const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');


//unprotected routes
userRouter.post('/users', userController.addUser);


//protected admin & user routes
userRouter.get('/users/id/:iduser', authenticate, userController.getUserById);

userRouter.get('/users/email/:email', authenticate, userController.getUserByEmail); //get idUser from db

userRouter.get('/users/booking/:idbooking', authenticate, userController.getUserByBooking); //get idUser from db


//protected user routes
userRouter.put('/users', authenticate, userController.updateUser);

userRouter.put('/users/password', authenticate, userController.updateUserPassword);


//protected admin routes
userRouter.get('/users', authenticate, userController.getAllUsers);

userRouter.delete('/users/:iduser', authenticate, userController.deleteUser);


module.exports = userRouter;