const Experience = require("../../models/profileInfo/experience");

// Add Experience
exports.addExperience = async (req, res) => {
  const { userId, experience } = req.body;
  try {
    const newExperience = new Experience({ userId, experience });
    await newExperience.save();
    res.status(201).json({ message: "Experience added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add experience." });
  }
};

// Get Experience by User ID
exports.getExperienceByUserId = async (req, res) => {
  const { userId } = req.query; // Extract userId from query parameters
  if (!userId) {
    return res.status(400).json({ error: "User ID is required." });
  }

  try {
    const experiences = await Experience.find({ userId });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch experience." });
  }
};

