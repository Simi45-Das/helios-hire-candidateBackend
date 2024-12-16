const stream = require('stream');
const { google } = require('googleapis');
const path = require('path');
const File = require('../models/projectFiles');

// Google Drive setup
const auth = new google.auth.GoogleAuth({
    keyFile: './service_account.json', // Path to your service account key file
    scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

exports.saveProjectFiles = async ({ user, files }) => {
    try {
        const fileLinks = [];

        // Iterate over each file and upload to Google Drive
        for (const file of files) {
            // Rename file with a timestamp
            const timestamp = Date.now();
            const ext = path.extname(file.originalname);
            const filename = `${timestamp}${ext}`;

            // Upload to Google Drive
            const fileMetadata = {
                name: filename,
                parents: ['1tEpkA8oA6vKD2uviIs9GHgOkbFfQYG4b'] // Specify your Google Drive folder ID
            };

            const media = {
                mimeType: file.mimetype,
                body: stream.Readable.from(file.buffer) // Use memory buffer as stream
            };

            const response = await drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id'
            });

            const fileId = response.data.id;
            const fileLink = `https://drive.google.com/file/d/${fileId}/view`;

            // Save file information in MongoDB
            const newFile = new File({
                userId: user._id,
                originalName: file.originalname,
                fileName: filename,
                filePath: fileLink,
                uploadedAt: new Date()
            });

            await newFile.save();

            fileLinks.push(fileLink);
        }

        return { message: 'Files uploaded and saved in Google Drive', fileLinks };
    } catch (err) {
        throw new Error('Error uploading files: ' + err.message);
    }
};
