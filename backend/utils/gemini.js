import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Enhanced Gemini prompt
export const generatePatientCase = async (specialization, level) => {
  const prompt = `
You're simulating a realistic medical patient for a clinical training platform.

Generate a fictional, realistic patient based on:
- Specialization: ${specialization}
- Difficulty Level: ${level}

Requirements:
- Choose a realistic disease based on specialization and difficulty.
- Include symptoms that clearly relate to the disease (use clinical accuracy).
- Mention emotional state and brief patient history.
- The health score (0–100) reflects how severe their condition is on arrival. Higher = healthier.

Return the following JSON format ONLY (no markdown, no extra text):

{
  "name": "String",
  "age": Number,
  "gender": "Male" | "Female" | "Other",
  "mainDiseases": [ "String" ],
  "criticalFactors": [ "String" ],
  "symptoms": [ "String" ],
  "emotionalState": "String",
  "history": "String",
  "initialHealthScore": Number
}
`;

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  return parseGeminiPatient(response);
};

export const parseGeminiPatient = (response) => {
  try {
    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    // Ensure all fields expected by the schema
    return {
      ...parsed,
      currentHealthScore: parsed.initialHealthScore || 100,
      isCured: false,
      isChronic: false,
      isDeceased: false
    };
  } catch (err) {
    console.error("Failed to parse Gemini JSON:", response);
    throw new Error("Invalid JSON structure from Gemini");
  }
};
