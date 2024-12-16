const { google } = require('googleapis');
const mongoose = require('mongoose');
const IntroductionVideo = require('../models/introVideo');
const stream = require('stream'); // Import stream module

exports.saveIntroVideo = async ({ userId, file }) => {
  try {
    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Invalid user ID format.');
    }

    // Check if the user already uploaded a video
    const existingVideo = await IntroductionVideo.findOne({ userId });
    if (existingVideo) {
      throw new Error('User has already uploaded a video.');
    }

    // Google Auth and Drive Setup
    const auth = new google.auth.GoogleAuth({
      keyFile: './service_account.json',
      scopes: ['https://www.googleapis.com/auth/drive.file']
    });

    const drive = google.drive({ version: 'v3', auth });

    const timestamp = Date.now();
    const fileName = `${timestamp}.mp4`;

    const fileMetadata = {
      'name': fileName,
      'parents': ['19LEh8oR6eeA9fE7eB53MdzcjgJi9-vkx'] // Google Drive folder ID
    };

    // Convert buffer to readable stream
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    const media = {
      mimeType: file.mimetype,
      body: bufferStream // Pass the readable stream instead of the buffer
    };

    // Upload file to Google Drive
    const driveResponse = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id, name'
    });

    const fileUrl = `https://drive.google.com/file/d/${driveResponse.data.id}/view`;
    const filePath = `https://drive.google.com/uc?export=view&id=${driveResponse.data.id}`;

    // Create and save new video record in the database
    const newVideo = new IntroductionVideo({
      userId,
      videoUrl: fileUrl,
      filePath: filePath
    });

    await newVideo.save();

    return { message: 'Video uploaded successfully.', videoUrl: fileUrl, filePath };
  } catch (error) {
    throw new Error(error.message);
  }
};
