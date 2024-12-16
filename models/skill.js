const mongoose = require("mongoose");

const skillsSchema = new mongoose.Schema({
  positions: { type: String },
});

module.exports = mongoose.model("Skills", skillsSchema);
