const multer = require('multer');
const recruiterService = require('../services/recruiterService');

// Configure multer for in-memory file storage
const upload = multer({ storage: multer.memoryStorage() });

exports.uploadVideoAndText = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message } = req.body;
    const file = req.file;

    // Call the service function
    const result = await recruiterService.saveRecmsgVid({ userId, message, file });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getVideoAndText = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await RecruiterMessage.findOne({ userId });
    if (!data) {
      return res.status(404).json({ error: 'No data found for this user.' });
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { uploadVideoAndText, getVideoAndText, upload };
