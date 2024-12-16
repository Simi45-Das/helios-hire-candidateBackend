const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  experience: { type: String, required: true },
});

module.exports = mongoose.model("Experience", experienceSchema);
