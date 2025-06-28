import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// MAIN function to generate patient using Gemini
export const generatePatientCase = async (specialization, level) => {
  const prompt = `
You're simulating a realistic medical patient for a clinical training platform.

Generate a fictional but realistic patient based on:
- Specialization: ${specialization}
- Difficulty Level: ${level}

Return the response as **pure JSON** with the following fields:
{
  "name": "String",
  "age": Number,
  "gender": "Male/Female/Other",
  "mainDiseases": [ "String" ],
  "criticalFactors": [ "String" ],
  "symptoms": [ "String" ],
  "emotionalState": "String",
  "history": "String"
}
No additional text or explanation.
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // ✅ Free model

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return parseGeminiPatient(response);
};

// Helper to clean and parse Gemini response
export const parseGeminiPatient = (response) => {
  try {
    // Remove markdown fences like ```json and ```
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", response);
    throw new Error("Invalid JSON structure from Gemini");
  }
};
