const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: { type: String, required: true, unique: true }, // Update field to 'userID'
});

module.exports = mongoose.model("user_info", userSchema);
