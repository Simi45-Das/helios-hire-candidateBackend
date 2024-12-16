const User = require("../../models/profileInfo/personalinfo");

/**
 * Save or update user information.
 */
exports.saveUser = async (req, res) => {
  try {
    const { userId, firstName, lastName, dob, gender } = req.body;

    if (!userId || !firstName || !lastName || !dob || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }

    let user = await User.findOne({ userId });

    if (user) {
      // Check if the user already has personal information
      if (user.firstName && user.lastName && user.dob && user.gender) {
        return res
          .status(409)
          .json({ message: "Personal information already exists." });
      }

      // Update existing user
      user.firstName = firstName;
      user.lastName = lastName;
      user.dob = dob;
      user.gender = gender;

      await user.save();
      return res
        .status(200)
        .json({ message: "User updated successfully.", user });
    }

    // Create a new user if not found
    user = new User({ userId, firstName, lastName, dob, gender });
    await user.save();

    res.status(201).json({ message: "User created successfully.", user });
  } catch (error) {
    console.error("Error saving user:", error.message);
    res.status(500).json({
      message: "An error occurred while saving user information.",
      error: error.message,
    });
  }
};

/**
 * Fetch user information by userId.
 */
exports.getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user); // Send user object directly
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching user information.",
      error: error.message,
    });
  }
};
