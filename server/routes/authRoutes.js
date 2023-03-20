const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

//unprotected routes
router.post('/login', authController.login);

//authenticate validation
router.use(authenticate);

//protected routes
router.get('/home', (req, res) => {
    const path = require('path');
    res.sendFile(path.resolve(__dirname + '/../views/home.html'));
})

module.exports = router;