
const express = require('express');
const {registerUser, loginUser, changePassword} = require('../controllers/auth-controller');
const router = express.Router();
const authMiddleware = require('../middleWare/auth-middleware');

// All routes related to authentication and authorization
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/change-password', authMiddleware, changePassword);

module.exports = router;