const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');

//unprotected routes
router.post('/login', authController.login);

//
router.use(authenticate);

//protected routes
router.get('/home', (req, res) => {
    res.send('Logged in.');
})


module.exports = router;