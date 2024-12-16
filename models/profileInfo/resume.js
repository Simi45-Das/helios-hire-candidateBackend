const mongoose = require("mongoose");

const resumeFileSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Treating userId as a plain String
  originalName: { type: String, required: true },
  fileName: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ResumeFile", resumeFileSchema);
