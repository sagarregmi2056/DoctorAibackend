const { GoogleGenerativeAI } = require("@google/generative-ai");
// Import your User model
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.checkmedicine = async (req, res, next) => {
  const prompt =
    "What is the name of this medicine? What are its uses, doses, disadvantages, and side effects?";

  const imageBuffer = req.file.buffer;

  try {
    // Save uploaded image to 'uploads' directory
    const uploadPath = path.join(
      __dirname,
      "../uploads",
      `${Date.now()}-${req.file.originalname}`
    );
    fs.writeFileSync(uploadPath, imageBuffer);

    const imageData = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Call the Gemini API with the prompt and image data
    const result = await model.generateContent([prompt, imageData]);
    const responseText = result.response.text();

    // Save the URL of the uploaded image and response text to the user's document
    const userId = req.userauth._id; // Assuming you have user info in req.userauth after authentication
    await User.findByIdAndUpdate(userId, {
      $push: {
        imagesWithResponses: {
          imageUrl: uploadPath,
          responseText: responseText,
        },
      },
    });

    // Send back the generated content as a JSON response
    res.json({ result: responseText });

    console.log(`Image saved at ${uploadPath}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
};

exports.getMedicineData = async (req, res) => {
  try {
    const userId = req.userauth._id; // Assuming authenticated user
    const user = await User.findById(userId).select("imagesWithResponses");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ imagesWithResponses: user.imagesWithResponses });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.checkMedicinedefault = async (req, res, next) => {
  const { language } = req.body;

  const prompt = `I am a medical student and need detailed information about the instrument shown in the image. Please provide its name, description, common uses, and any relevant safety information also if possible. This information is for educational purposes only. Please translate this response into ${language}. **Disclaimer: This response is not a substitute for professional medical advice.**`;

  if (!req.file) {
    return res.status(400).json({ error: "Image data is required." });
  }

  try {
    // Prepare image data for the AI model
    const imageBuffer = req.file.buffer;
    const imageData = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Call the AI model with the prompt and image data
    const result = await model.generateContent([prompt, imageData]);
    const responseText = result.response.text();

    // Send back the generated content as a JSON response (not saving to DB)
    res.json({ result: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
};

exports.checkInstruments = async (req, res, next) => {
  const { language } = req.body;
  const prompt = `I am a medical student and need detailed information about the instrument shown in the image. Please provide its name, description, common uses, and any relevant safety information. This information is for educational purposes only.Please translate this response into ${language}. **Disclaimer: This response is not a substitute for professional medical advice.** `;
  if (!req.file) {
    return res.status(400).json({ error: "Image data is required." });
  }

  try {
    // Prepare image data for the AI model
    const imageBuffer = req.file.buffer;
    const imageData = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Call the AI model with the prompt and image data
    const result = await model.generateContent([prompt, imageData]);
    const responseText = result.response.text();

    // Send back the generated content as a JSON response (not saving to DB)
    res.json({ result: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
};

exports.checkSymptoms = async (req, res, next) => {
  const { language } = req.body;
  const prompt = `Based on the symptoms presented in the provided image, please describe common conditions or diseases associated with these symptoms in detail. Include potential causes and general advice on what to do next. This information is for educational purposes only.Please translate this response into ${language}. **Disclaimer: This response is not a substitute for professional medical advice nor for any recommendation.**`;

  if (!req.file) {
    return res.status(400).json({ error: "Image data is required." });
  }

  try {
    // Prepare image data for the AI model
    const imageBuffer = req.file.buffer;
    const imageData = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: req.file.mimetype,
      },
    };

    // Call the AI model with the prompt and image data
    const result = await model.generateContent([prompt, imageData]);
    const responseText = result.response.text();

    // Send back the generated content as a JSON response (not saving to DB)
    res.json({ result: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
};
