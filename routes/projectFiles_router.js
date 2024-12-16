// routes/fileRouter.js
const express = require('express');
const multer = require('multer');
const fileController = require('../controllers/projectFiles_controller');

const router = express.Router();

// Multer setup to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Route - Handles multiple file uploads
router.post('/upload/:userId', upload.array('files', 10), fileController.uploadFiles);

module.exports = router;
