const mongoose = require('mongoose');

const recruiterMessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'newuser_data',
    required: true,
    unique: true
  },
  video: {
    type: String, // URL of the video file stored in Google Drive
    default: null
  },
  message: {
    type: String, // Texts to be stored
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('recruiterMessage_box', recruiterMessageSchema);
