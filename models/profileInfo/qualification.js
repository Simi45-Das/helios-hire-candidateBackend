const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  graduation: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
  postGraduation: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: Number, required: true },
    },
  ],
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

module.exports = Qualification;
