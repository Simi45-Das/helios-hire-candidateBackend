const ContactInfo = require("../../models/profileInfo/contactInfo");

// Create or Update Contact Info
exports.createOrUpdateContact = async (req, res) => {
  const { userId, email, phone, whatsapp, address } = req.body;

  if (!userId || !email) {
    return res.status(400).json({ message: "UserId and Email are required" });
  }

  try {
    const contact = await ContactInfo.findOneAndUpdate(
      { userId },
      { email, phone, whatsapp, address },
      { new: true, upsert: true }
    );
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error saving contact info", error });
  }
};

// Get Contact Info
exports.getContact = async (req, res) => {
  const { userId } = req.query; // Use query parameter instead of URL parameter

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  try {
    const contact = await ContactInfo.findOne({ userId });
    if (!contact) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving contact info", error });
  }
};


// Update Contact Info
exports.updateContact = async (req, res) => {
  const { userId, email, phone, whatsapp, address } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "UserId is required" });
  }

  const updateFields = {};
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (whatsapp) updateFields.whatsapp = whatsapp;
  if (address) updateFields.address = address;

  try {
    const contact = await ContactInfo.findOneAndUpdate(
      { userId },
      { $set: updateFields },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact info not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact info", error });
  }
};

