const Qualification = require("../../models/profileInfo/qualification");

// Controller to add or update qualifications
exports.addQualification = async (req, res) => {
  const { userId, graduation, postGraduation } = req.body;

  if (!userId || (!graduation && !postGraduation)) {
    return res
      .status(400)
      .json({
        message: "User ID and at least one qualification are required.",
      });
  }

  try {
    // Check if user already has qualifications
    const existingRecord = await Qualification.findOne({ userId });
    if (existingRecord) {
      // Update graduation and post-graduation qualifications if provided
      existingRecord.graduation = graduation || existingRecord.graduation;
      existingRecord.postGraduation =
        postGraduation || existingRecord.postGraduation;
      await existingRecord.save();
      return res
        .status(200)
        .json({ message: "Qualifications updated successfully." });
    }

    // Create new record with provided qualifications
    const newRecord = new Qualification({ userId, graduation, postGraduation });
    await newRecord.save();
    res.status(201).json({ message: "Qualifications added successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Controller to fetch qualifications for a user
exports.getQualifications = async (req, res) => {
  const { userId } = req.query; // Get userId from query parameters

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const record = await Qualification.findOne({ userId });
    if (!record) {
      return res
        .status(404)
        .json({ message: "No qualifications found for this user." });
    }
    res.status(200).json(record); // Send the full qualifications object (graduation, postGraduation)
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
