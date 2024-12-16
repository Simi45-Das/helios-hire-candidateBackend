const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  whatsappNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userID: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        return typeof v === "string" && v.length > 0; // Ensure userID is a non-empty string
      },
      message: (props) => `${props.value} is not a valid userID!`,
    },
  },
  date: { type: Date, default: Date.now },
});

const User = mongoose.model("user_info", userSchema);

module.exports = User;
