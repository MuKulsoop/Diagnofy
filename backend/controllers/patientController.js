import Patient from "../models/Patient.js";
import { generatePatientCase } from "../utils/gemini.js";

export const generatePatient = async (req, res) => {
  const { specialization, level, userId } = req.body;

  try {
    const caseData = await generatePatientCase(specialization, level);

    const newPatient = new Patient({
      ...caseData,
      createdBy: userId
    });

    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(500).json({
      message: "Failed to generate patient",
      error: err.message
    });
  }
};
