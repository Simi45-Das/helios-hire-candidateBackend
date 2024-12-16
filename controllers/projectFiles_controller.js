const User = require('../models/newUser_reg');
const fileService = require('../services/projectFiles');

exports.uploadFiles = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).send('No files uploaded.');
        }

        // Call the service function to handle file upload and saving
        const result = await fileService.saveProjectFiles({ user, files: req.files });

        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
