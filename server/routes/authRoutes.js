const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticate = require('../middlewares/authMiddleware');


//unprotected routes
router.post('/login', authController.login);

//protected routes
router.get('/home', authenticate, (req, res) => {
    res.sendFile(process.env.ROOT_PATH + '/views/home.html');
})

router.get('/logout', authenticate, authController.logout);

module.exports = router;