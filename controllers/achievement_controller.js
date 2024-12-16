const Achievement = require('../models/achievementDetails');
const { google } = require('googleapis');
const multer = require('multer');
const { Readable } = require('stream'); // Import stream module

// Google Drive setup using service account key file
const auth = new google.auth.GoogleAuth({
    keyFile: './service_account.json', // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file'], // Scope for Drive API
});

const drive = google.drive({ version: 'v3', auth });

// Multer setup for file handling (in memory storage)
const storage = multer.memoryStorage();

const upload = multer({ storage: storage }).array('certificates');

// Helper function to convert buffer to readable stream
function bufferToStream(buffer) {
    const readable = new Readable();
    readable._read = () => {}; // _read is required but can be a no-op
    readable.push(buffer);
    readable.push(null); // No more data
    return readable;
}

exports.uploadAchievement = async (req, res) => {
    try {
        upload(req, res, async (err) => {
            if (err) return res.status(500).send(err.message);

            const { description } = req.body;
            const userId = req.params.userId;

            let certificates = [];

            // Upload each file to Google Drive directly from memory
            for (let file of req.files) {
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
            res.status(201).json({ message: 'Achievement saved successfully', achievement });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
