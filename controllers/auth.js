const User = require("../models/newUser");
const { sendEmail } = require("../services/auth");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { name, phoneNumber, whatsappNumber, email, password } = req.body;

  // Generate a unique user ID
  const userID = crypto.randomBytes(4).toString("hex").toUpperCase();
  console.log("Generated userID:", userID); // Debugging

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      phoneNumber,
      whatsappNumber,
      email,
      userID,
      password: hashedPassword,
    });

    await newUser.save();
    await sendEmail(email, userID);

    res.status(201).json({
      message: "Registration successful! Check your email for User ID.",
      userID,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Registration failed.", error });
  }
};

exports.login = async (req, res) => {
  const { userID, password } = req.body;

  try {
    const user = await User.findOne({ userID });
    if (!user) {
      return res.status(404).json({ message: "Invalid User ID or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid User ID or password" });
    }

    const payload = {
      user: {
        id: user.id,
        userID: user.userID,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed.", error });
  }
};



exports.getAllcandidateNames = async (req, res) => {
  try {
    // Fetch all users with only 'userID' and 'name' fields
    const candidates = await User.find({}, "userID name");

    if (candidates.length === 0) {
      return res.status(404).json({ message: "No candidates found." });
    }

    res.status(200).json(candidates);
  } catch (error) {
    console.error("Error fetching candidate names:", error.message || error);
    res
      .status(500)
      .json({ message: "Failed to fetch candidate names.", error });
  }
};



exports.getcandidateByUserid = async (req, res) => {
  try {
    const { userID } = req.query; // Using query parameters; alternatively, use req.params if routing supports it.

    if (!userID) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // Ensure userID lookup is case-insensitive if needed (add `collation` option for MongoDB).
    const user = await User.findOne({ userID }, { name: 1, userID: 1, _id: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "User found",
      data: { name: user.name, userID: user.userID },
    });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({
      message: "An error occurred while fetching user details.",
    });
  }
};
