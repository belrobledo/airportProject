const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');


//unprotected routes
authRouter.post('/login', authController.login);

//protected routes
authRouter.get('/home', authenticate, (req, res) => {
    res.sendFile(process.env.ROOT_PATH + '/views/home.html');
})

authRouter.get('/logout', authenticate, authController.logout);

module.exports = authRouter;