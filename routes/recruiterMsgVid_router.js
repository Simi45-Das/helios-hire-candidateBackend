const express = require('express');
const router = express.Router();
const { uploadVideoAndText, getVideoAndText, upload } = require('../controllers/recruiterMsgVid_controller');

// Route to upload video and text
router.post('/upload/:userId', upload.single('video'), uploadVideoAndText);

// Route to get video and text data
router.get('/:userId', getVideoAndText);

module.exports = router;
