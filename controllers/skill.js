const skillsService = require("../services/skill");

class SkillsController {
  async create(req, res) {
    try {
      const data = req.body;
      const skills = await skillsService.createSkills(data);
      res.status(201).json(skills);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new SkillsController();
