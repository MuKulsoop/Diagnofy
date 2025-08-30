import Patient from "../models/Patient.js";
import { generatePatientCase } from "../utils/gemini.js";

export const generatePatient = async (req, res) => {
  const { specialization, level, userId } = req.body;

  // Validation
  if (!specialization || !level || !userId) {
    return res.status(400).json({
      message: "Missing required fields: specialization, level, or userId"
    });
  }

  try {
    // Generate case data from Gemini
    const caseData = await generatePatientCase(specialization, level);

    // Create patient with extended fields handled in the util
    const newPatient = new Patient({
      ...caseData,
      createdBy: userId
    });

    await newPatient.save();

    return res.status(201).json({
      message: "Patient generated successfully",
      patient: newPatient
    });
  } catch (err) {
    console.error("❌ Error generating patient:", err);

    return res.status(500).json({
      message: "Failed to generate patient",
      error: err.message || "Internal Server Error"
    });
  }
};

export const generatePatients = async (req, res) => {
  const { specialization, level, userId } = req.body;

  // Validation
  if (!specialization || !level || !userId) {
    return res.status(400).json({
      message: "Missing required fields: specialization, level, or userId"
    });
  }

  try {
    // Generate case data from Gemini
    const AllPatients = []
    for ( let i = 0; i < 3; i++){
      const caseData = await generatePatientCase(specialization, level);

    // Create patient with extended fields handled in the util
    const newPatient = new Patient({
      ...caseData,
      createdBy: userId
    });

    const savedPatient = await newPatient.save();
    AllPatients.push(savedPatient);
    }
    console.log(AllPatients);
    

    return res.status(201).json({
      message: "Patient generated successfully",
      AllPatients
    });
    
  } catch (err) {
    console.error("❌ Error generating patient:", err);

    return res.status(500).json({
      message: "Failed to generate patient",
      error: err.message || "Internal Server Error"
    });
  }
};
