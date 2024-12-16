// routes/achievementRouter.js

const express = require('express');
const router = express.Router();
const achievementController = require('../controllers/achievement_controller');

router.post('/achievement/:userId', achievementController.uploadAchievement);

module.exports = router;
