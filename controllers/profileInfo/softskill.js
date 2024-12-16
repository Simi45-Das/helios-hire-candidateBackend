const SoftSkills = require("../../models/profileInfo/softskill");

// Controller function to handle saving soft skills data
exports.saveSoftSkills = async (req, res) => {
  const { userId, communication, teamwork, leadership } = req.body;

  if (!userId || !communication || !teamwork || !leadership) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const softSkills = new SoftSkills({
      userId,
      communication,
      teamwork,
      leadership,
    });

    await softSkills.save();
    res.status(201).json({ message: "Soft skills saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save soft skills" });
  }
};

// Controller function to retrieve soft skills data by userId
exports.getSoftSkills = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const softSkills = await SoftSkills.findOne({ userId });
    if (!softSkills) {
      return res.status(404).json({ error: "Soft skills not found" });
    }
    res.status(200).json(softSkills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch soft skills" });
  }
};
