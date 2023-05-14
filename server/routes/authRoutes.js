const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const { authenticate, notAunthenticated } = require('../middlewares/authMiddleware');


//unprotected routes
authRouter.post('/login', notAunthenticated, authController.login);

//protected logged user routes
authRouter.get('/logout', authenticate, authController.logout);


module.exports = authRouter;