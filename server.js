const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");


const personalinfo = require("./routes/profileInfo/personalinfo");
const contactInfo = require("./routes/profileInfo/contactInfo");
const experience = require("./routes/profileInfo/experience");
const softskill = require("./routes/profileInfo/softskill");
const resume = require("./routes/profileInfo/resume");
const qualification = require("./routes/profileInfo/qualification");
const mediaLink = require("./routes/profileInfo/socialMedia");
const UploadPhoto = require("./routes/profileInfo/uploadPhoto");
const tagline = require("./routes/tagline");



// const multer = require("multer"); // For file uploads
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    // allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  })
);

// Connect Database
connectDB();

// Bodyparser Middleware
app.use(bodyParser.json());


// Middleware for parsing JSON bodies and handling file uploads
app.use(express.json());
// app.use(
//   multer().fields([
//     { name: "certificates", maxCount: 10 },
//     { name: "introVideo", maxCount: 1 },
//     { name: "projectFiles", maxCount: 10 },
//     { name: "recruiterVideo", maxCount: 1 },
//     { name: "resume", maxCount: 1 },
//   ])
// );

// Use the user profile routes

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/personalInfo", personalinfo);
app.use("/api/contactInfo", contactInfo);
app.use("/api/experience", experience);
app.use("/api/softskill", softskill);
app.use("/api/resume", resume);
app.use("/api/qualification", qualification);
app.use("/api/mediaLinks", mediaLink);
app.use("/api/v1/upload", UploadPhoto);
app.use("/api/taglines", tagline);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
