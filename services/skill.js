const Skills = require("../models/skill");

class SkillsService {
  async createSkills(data) {
    const skills = new Skills(data);
    return await skills.save();
  }
}

module.exports = new SkillsService();
