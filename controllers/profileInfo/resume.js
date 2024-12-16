const { saveResume, getpdfsByuserId } = require("../../services/resume");

exports.uploadResume = async (req, res) => {
  try {
    const { user: { userID } } = req.user;
    console.log(userID);
    const file = req.file; // Assuming you are using middleware like multer for handling file uploads

    if (!file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const result = await saveResume({ user: { _id: userID }, file });
    return res
      .status(200)
      .json({ message: result.message, fileLink: result.fileLink });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to upload the file." });
  }
};

exports.submitResume = async (req, res) => {
  try {

     const {
       user: { userID },
     } = req.user;  
    const { fileLink } = req.body;

    const fileData = new File({
      userId:userID,
      filePath: fileLink,
      uploadedAt: new Date(),
    });

    await fileData.save();
    return res.status(200).json({ message: "Resume submitted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error submitting resume." });
  }
};


//_____________________________________________________________________________________


exports.getpdfByuserId = async (req, res) => {
  try {
    const {
      user: { userID },
    } = req.user; // Retrieve type and companyId from the query parameters

    

    if (!userID) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const pdfs = await getpdfsByuserId(userID); // Fetch photos for this company

    if (!pdfs || !pdfs.filePath ) {
      return res
        .status(404)
        .json({ message: "No pdf found for this user." });
    }

    res.status(200).json({ urls: pdfs.filePath });
  } catch (error) {
    console.error("Error in getPdfByuserId:", error.message);
    res.status(500).json({ message: "Error fetching photos." });
  }
};

exports.viewpdfs = async (req, res) => {
  try {
    const pdfUrls = JSON.parse(req.query.urls); // Expecting an array of image URLs in the query string
    console.log("pdf URLs: ", pdfUrls);

    if (!pdfUrls || !Array.isArray(pdfUrls)) {
      return res.status(400).send("Please provide an array of pdf URLs.");
    }

    const pdfPromises = pdfUrls.map((pdfUrl) =>
      axios.get(pdfUrl, { responseType: "arraybuffer" })
    );

    // Wait for all image requests to finish
    const pdfResponses = await Promise.all(pdfPromises);

    // Convert images to Base64
    const pdfs = pdfResponses.map((response) => {
      return `data:image/jpeg;base64,${Buffer.from(response.data).toString(
        "base64"
      )}`;
    });

    res.json({ pdfs });
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).send("Error fetching images.");
  }
};

