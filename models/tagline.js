// File: models/taglineModel.js
const mongoose = require("mongoose");

const taglineSchema = new mongoose.Schema({
  userID: String,
  tagline: String,
});

const Tagline = mongoose.model("Tagline", taglineSchema);

module.exports = Tagline;
