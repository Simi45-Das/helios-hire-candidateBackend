const Achievement = require('../models/achievementDetails');
const { google } = require('googleapis');
const { Readable } = require('stream'); // Import stream module

// Google Drive setup using service account key file
const auth = new google.auth.GoogleAuth({
    keyFile: './service_account.json', // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope for Drive API
});

const drive = google.drive({ version: 'v3', auth });

// Helper function to convert buffer to readable stream
function bufferToStream(buffer) {
    const readable = new Readable();
    readable._read = () => {}; // _read is required but can be a no-op
    readable.push(buffer);
    readable.push(null); // No more data
    return readable;
}

// Function to save achievement details (exported as a service)
exports.saveAchievements = async (userId, files, description) => {
    try {
        let certificates = [];

        // Upload each file to Google Drive directly from memory
        for (let file of files) {
            const driveResponse = await drive.files.create({
                requestBody: {
                    name: `${Date.now()}_${file.originalname}`, // Rename file with a timestamp
                    parents: ['1sEmDj9hiQM1q4spF_yE_vos0cwxly8vP'], // Google Drive folder ID
                },
                media: {
                    mimeType: file.mimetype,
                    body: bufferToStream(file.buffer), // Convert buffer to stream
                },
            });

            certificates.push({
                filePath: `https://drive.google.com/file/d/${driveResponse.data.id}/view`,
            });
        }

        // Save achievement details in MongoDB
        const achievement = new Achievement({
            userId: userId,
            certificates: certificates,
            description: description,
        });

        await achievement.save();
        return { message: 'Achievement saved successfully', achievement };
    } catch (error) {
        throw new Error(error.message);
    }
};
