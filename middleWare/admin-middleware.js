
const isAdmin = (req,res,next) => {
    if(req.userInfo.role !== 'admin'){
        return res.status(403).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
    next();
}

module.exports = isAdmin;