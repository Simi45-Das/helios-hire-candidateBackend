const { Readable } = require('stream');
const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const RecruiterMessage = require('../models/recruiterMsgVid');

// Google Drive setup
const drive = google.drive({ 
  version: 'v3', 
  auth: new GoogleAuth({ keyFile: './service_account.json', scopes: ['https://www.googleapis.com/auth/drive.file'] }) 
});

exports.saveRecmsgVid = async ({ userId, message, file }) => {
  try {
    if (!userId || !message || !file) {
      throw new Error('User ID, message, and video file are required.');
    }

    const existingData = await RecruiterMessage.findOne({ userId });
    if (existingData) {
      throw new Error('A video has already been uploaded for this user.');
    }

    // Generate timestamp for the filename
    const timestamp = Date.now();
    const fileName = `${timestamp}.mp4`;

    // Create a readable stream from the buffer
    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null); // End the stream

    // Upload video to Google Drive
    const driveFileMetadata = {
      name: fileName,
      parents: ['1M1BCuQwisR0z3tG-c3YAE_n20_M4gghc'] // Google Drive folder ID
    };
    const media = {
      mimeType: 'video/mp4',
      body: readableStream
    };
    const driveResponse = await drive.files.create({
      requestBody: driveFileMetadata,
      media,
      fields: 'id'
    });
    
    const videoUrl = `https://drive.google.com/uc?id=${driveResponse.data.id}`;

    // Save to MongoDB
    const newMessage = new RecruiterMessage({ userId, video: videoUrl, message });
    await newMessage.save();

    return { success: true, data: newMessage };
  } catch (error) {
    throw new Error(error.message || 'Server error');
  }
};
