
const express = require('express');
const authMiddleware = require('..//middleWare/auth-middleware');
const router = express.Router();

router.get('/welcome', authMiddleware, (req, res) => {
    const {username , userId, role} = req.userInfo;
    res.json({
        success : true,
        message : "Welcome to home page",
        user : {
            username,
            userId,
            role,
        }
    })
});

module.exports = router;