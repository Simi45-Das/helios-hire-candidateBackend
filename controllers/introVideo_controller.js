const videoService = require('../services/videoService');

const uploadVideo = async (req, res) => {
  try {
    let userId = req.params.userId.trim();
    
    // Call the service function
    const result = await videoService.saveIntroVideo({ userId, file: req.file });
    
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading video.', error: error.message });
  }
};

module.exports = { uploadVideo };
