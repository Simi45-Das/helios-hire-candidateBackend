const mongoose = require("mongoose");

const contactInfoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    whatsapp: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact_Info", contactInfoSchema);
