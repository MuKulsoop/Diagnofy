import mongoose from "mongoose";

// 💬 Chat Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "patient"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// 📄 Test Result Schema
const testResultSchema = new mongoose.Schema({
  testName: String,
  resultText: String,
  resultImageURL: String,
  format: { type: String, enum: ["image", "pdf", "text"], default: "text" }
});

// 📊 General Diagnosis Report Schema (used for both initial and final)
const diagnosisReportSchema = new mongoose.Schema({
  questioningScore: { type: Number, min: 0, max: 10 },
  questioningFeedback: String,

  diagnosisScore: { type: Number, min: 0, max: 10 },
  diagnosisFeedback: String,

  treatmentScore: { type: Number, min: 0, max: 10 },
  treatmentFeedback: String,

  overallScore: { type: Number, min: 0, max: 10 },
  summaryFeedback: String,

  strengths: [String],
  areasToImprove: [String],
  analyzedAt: { type: Date, default: Date.now }
});

// 📌 Initial Diagnosis Details
const initialDiagnosisSchema = new mongoose.Schema({
  clinicalReasoning: String,
  preliminaryDiagnosis: String,
  initialMedications: [String],
  submittedAt: { type: Date, default: Date.now }
});

// 📌 Final Diagnosis Details
const finalDiagnosisSchema = new mongoose.Schema({
  updatedReasoning: String,
  finalDiagnosis: String,
  finalMedications: [String],
  treatmentPlan: {
    lifestyleRecommendations: String,
    followUpInstructions: String
  },
  submittedAt: { type: Date, default: Date.now }
});

// 🩺 Session Schema
const sessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  level: String,
  specialization: String,
  messages: [messageSchema],
  testResults: [testResultSchema],
  initialDiagnosis: initialDiagnosisSchema,
  finalDiagnosis: finalDiagnosisSchema,
  initialDiagnosisReport: diagnosisReportSchema,
  finalDiagnosisReport: diagnosisReportSchema,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", sessionSchema);
