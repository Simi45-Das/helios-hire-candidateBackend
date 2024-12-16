const mongoose = require("mongoose");

const FileSchema = new mongoose.Schema({
  userId: {
    type: String, // Directly storing userId as a string from the frontend
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  filePath: {
    type: String,
    required: true,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("resumeFiles", FileSchema);
