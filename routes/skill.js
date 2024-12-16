const express = require("express");
const skillsController = require("../controllers/skill");

const router = express.Router();

router.post("/skills", skillsController.create);

module.exports = router;
