const express = require('express');
const authMiddleware = require('../middleWare/auth-middleware');
const adminMiddleware = require('../middleWare/admin-middleware');
const uploadMiddleware = require('../middleWare/upload-middleware');
const { uploadImage, fetchAllImages, deleteImage } = require('../controllers/image-controller');

const router = express.Router();

// upload the image
router.post('/upload', authMiddleware, adminMiddleware, uploadMiddleware.single('image'), uploadImage);

// fetch all images
router.get('/fetch', authMiddleware, fetchAllImages);

// delete image
router.delete('/:id',authMiddleware, adminMiddleware,  deleteImage)

module.exports = router;