// File: controllers/taglineController.js
const Tagline = require("../models/tagline");

exports.addTagline = async (req, res) => {
  try {
    const { userID, tagline } = req.body;
    const newTagline = new Tagline({ userID, tagline });
    await newTagline.save();
    res.status(201).json({ message: "Tagline added successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};



exports.getTaglines = async (req, res) => {
  const { userID } = req.query; // Get userID from query parameters

  if (!userID) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const records = await Tagline.find({ userID }); // Query all taglines for the given userID

    if (!records || records.length === 0) {
      return res
        .status(404)
        .json({ message: "No taglines found for this user." });
    }
    res.status(200).json(records); // Send all taglines for the user
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
