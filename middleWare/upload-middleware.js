const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
const path = require('path');

// const uploadDir = path.join(__dirname, '..', 'uploads');
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// set the storage engine
const storage = multer.diskStorage({
    destination : (req, file, cb)=>  {
        cb(null, "uploads/");
    },
    filename : (req, file, cb) =>{
        cb(null, 
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
});

// File filter function
const checkFileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image')){
        cb(null, true)
    }
    else{
        cb(new Error('Please upload an image'))
    }
}

module.exports = multer({
    storage : storage,
    fileFilter : checkFileFilter,
    limits : {
        fileSize : 5 * 1024 * 1024 // 5MB
    }
});