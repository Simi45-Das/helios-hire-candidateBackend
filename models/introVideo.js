const mongoose = require('mongoose');

const introductionVideoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'newuser_data',
    required: true,
    unique: true // Ensures one video per user
  },
  videoUrl: {
    type: String,
    required: true
  },
  filePath: {
    type: String, // Save the direct file path in the database
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('IntroductionVideo', introductionVideoSchema);
