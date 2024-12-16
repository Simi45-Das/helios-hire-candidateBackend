const mongoose = require("mongoose");

const softSkillsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  communication: { type: String, required: true },
  teamwork: { type: String, required: true },
  leadership: { type: String, required: true },
});

module.exports = mongoose.model("softSkills", softSkillsSchema);
