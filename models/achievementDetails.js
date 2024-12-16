// models/achievementSchema.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'newuser_data', required: true },
    certificates: [
        {
            filePath: { type: String, required: true },
            uploadedAt: { type: Date, default: Date.now },
        }
    ],
    description: { type: String, required: true },
});

const Achievement = mongoose.model('achievement_details', achievementSchema);

module.exports = Achievement;
