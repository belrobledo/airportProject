const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

//unprotected routes
router.post('/login', authController.login);

//protected routes
router.get('/home', authenticate, (req, res) => {
    const path = require('path');
    res.sendFile(path.resolve(__dirname + '/../views/home.html'));
})

router.get('/logout', authenticate, authController.logout);

module.exports = router;