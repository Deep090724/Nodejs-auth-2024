
const express = require('express');
const authMiddleware = require('../middleWare/auth-middleware');
const adminMiddleware = require('../middleWare/admin-middleware');

const router = express.Router();

router.get('/welcome', authMiddleware , adminMiddleware , (req,res) => {
    res.json({
        message: "Welcome to admin page",
    });
})

module.exports = router;