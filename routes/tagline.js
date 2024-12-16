// File: routes/taglineRouter.js
const express = require("express");
const router = express.Router();
const taglineController = require("../controllers/tagline");

router.post("/submittagline", taglineController.addTagline);
router.get("/getagline-by-userid",taglineController.getTaglines)

module.exports = router;
