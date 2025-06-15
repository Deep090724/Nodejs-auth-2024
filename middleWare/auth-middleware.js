const JWT = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    console.log("Middleware is called");

    const authHeader = req.headers["authorization"];
    console.log(authHeader);
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({
            success: false,
            message: "Unauthorized access"
        });
    }

    // Decoding the token and verifying it
    try{
        const decodeToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodeToken);

        req.userInfo = decodeToken;

        next();
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

};

module.exports = authMiddleware;