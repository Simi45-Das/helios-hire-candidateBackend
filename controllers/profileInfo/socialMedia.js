const SocialMediaLinks = require("../../models/profileInfo/socialMedia");

// Controller method to save social media links
exports.saveLinks = async (req, res) => {
  const {
    linkedIn,
    github,
    youtube,
    instagram,
    facebook,
    otherPlatform,
    userId,
  } = req.body;

  try {
    const existingLinks = await SocialMediaLinks.findOne({ userId });
    if (existingLinks) {
      // If links already exist, update them
      existingLinks.linkedIn = linkedIn || existingLinks.linkedIn;
      existingLinks.github = github || existingLinks.github;
      existingLinks.youtube = youtube || existingLinks.youtube;
      existingLinks.instagram = instagram || existingLinks.instagram;
      existingLinks.facebook = facebook || existingLinks.facebook;
      existingLinks.otherPlatform =
        otherPlatform || existingLinks.otherPlatform;
      await existingLinks.save();
      return res
        .status(200)
        .json({ message: "Social media links updated successfully" });
    }

    // If links don't exist, create a new document
    const newLinks = new SocialMediaLinks({
      userId,
      linkedIn,
      github,
      youtube,
      instagram,
      facebook,
      otherPlatform,
    });

    await newLinks.save();
    res.status(201).json({ message: "Social media links saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller method to get social media links by userId
exports.getLinks = async (req, res) => {
  const userId = req.query.userId; // Retrieving userId from query parameters

  if (!userId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const links = await SocialMediaLinks.findOne({ userId });
    if (!links) {
      return res.status(404).json({ message: "Social media links not found" });
    }
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
