const express = require('express');
const multer = require('multer');
const { uploadVideo } = require('../controllers/introVideo_controller');

const router = express.Router();
const upload = multer(); // No storage option needed since we won't store locally

router.post('/upload/:userId', upload.single('video'), uploadVideo);

module.exports = router;
