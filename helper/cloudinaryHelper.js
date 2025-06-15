const cloudinary = require('../Config/cloudinary');

const uploadToCloudinary = async(filePath) => {
    try{
        console.log("Uploading File: ", filePath);
        
        const result = await cloudinary.uploader.upload(filePath);

        return {
            url : result.secure_url,
            public_id : result.public_id,
        }

    }catch(error){
        console.error('Error uploading image to cloudinary: ', error);
        throw new Error('Error uploading image to cloudinary');
    }
}

module.exports = {
    uploadToCloudinary
}
