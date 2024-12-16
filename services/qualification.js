const QualificationDetails = require('../models/qualification');

exports.saveQualificationDetails = async ({ userId, degrees, institutions, years, degrees2, institutions2, years2 }) => {
    try {
        // Create the graduation and post-graduation arrays
        const graduation = degrees.map((degree, index) => ({
            degree,
            institution: institutions[index],
            year: years[index],
        }));

        const postGraduation = degrees2.map((degree, index) => ({
            degree,
            institution: institutions2[index],
            year: years2[index],
        }));

        // Find and update or create new qualification details
        let qualificationDetails = await QualificationDetails.findOne({ userId });

        if (!qualificationDetails) {
            qualificationDetails = new QualificationDetails({
                userId,
                graduation,
                postGraduation,
            });
        } else {
            qualificationDetails.graduation.push(...graduation);
            qualificationDetails.postGraduation.push(...postGraduation);
        }

        await qualificationDetails.save();
        return { message: 'Qualification details added successfully', qualificationDetails };
    } catch (error) {
        throw new Error('Failed to add qualification details');
    }
};
