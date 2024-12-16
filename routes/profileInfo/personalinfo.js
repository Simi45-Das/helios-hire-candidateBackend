const express = require("express");
const router = express.Router();
const userController = require("../../controllers/profileInfo/personalinfo");

// Route to save or update user information
router.post("/saveUser", userController.saveUser);

// Route to get user personal information
router.get("/getUser", userController.getUser);

module.exports = router;
