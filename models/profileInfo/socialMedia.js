const mongoose = require("mongoose");

const socialMediaLinksSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  linkedIn: { type: String },
  github: { type: String },
  youtube: { type: String },
  instagram: { type: String },
  facebook: { type: String },
  otherPlatform: { type: String },
});

const SocialMediaLinks = mongoose.model(
  "SocialMediaLinks",
  socialMediaLinksSchema
);

module.exports = SocialMediaLinks;
