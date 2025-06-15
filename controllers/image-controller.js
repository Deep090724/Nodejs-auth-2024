
const Image = require('../Model/Image');
const { uploadToCloudinary } = require('../helper/cloudinaryHelper');
const cloudinary = require('../Config/cloudinary');
// const fs = require('fs');

const uploadImage = async (req, res) => {
    try {
        // check if file uploaded
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "File is not uploaded"
            });
        }

        // upload image to cloudinary 
        const { url, public_id } = await uploadToCloudinary(req.file.path);

        // store the url and publicId along with the userInfo
        const newlyUploadedImage = new Image({
            url,
            publicId: public_id,
            userId: req.userInfo.userId
        })

        await newlyUploadedImage.save();

        // remove the file from local storage
        // fs.unlinkSync(req.file.path);

        res.status(201).json({
            success: true,
            message: "Image is uploaded successfully",
        });

    } catch (error) {
        console.error("Error uploading image: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading the image",
        });
    }
}

const fetchAllImages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = (page -1)  * limit;

        const sortBy = req.query.sortBy || 'userId';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Image.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);
        const sortObj = {};
         sortObj[sortBy] = sortOrder;
        const image = await Image.find().sort(sortObj).skip(skip).limit(limit);

        if (image) {
            return res.status(200).json({
                success: true,
                message: "Image fetch successfully",
                currentPage: page,
                totalPages: totalPages,
                totalImages: totalImages, 
                data: image
            });
        }
    }
    catch (error) {
        console.Error("Error fetching images: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while uploading the image",
        });
    }
}

// Delete image from cloudinary and local storage(MONGODB)

const deleteImage = async (req, res) => {
    try {
        const getImageId = req.params.id;
        const userId = req.userInfo.userId;

        // find the image by id
        const image = await Image.findById(getImageId);

        if (!image) {
            return res.status(400).json({
                success: false,
                message: "Image not found"
            });
        }

        // check if the image belongs to the user
        if (image.userId.toString() !== userId) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized to delete this image"
            });
        }

        // delete image from cloudinary
        await cloudinary.uploader.destroy(image.publicId);

        // delete image from MongoDB
        await Image.findByIdAndDelete(getImageId);

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });

    } catch (error) {
        console.error("Error deleting image: ", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the image",
        });
    }
}

module.exports = {
    uploadImage, fetchAllImages, deleteImage
}