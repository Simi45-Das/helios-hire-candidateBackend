const UserProfile = require("../models/userProfile");

const saveUserProfile = async (userData) => {
  const user = new UserProfile(userData);
  await user.save();
  return user;
};

module.exports = {
  saveUserProfile,
};
