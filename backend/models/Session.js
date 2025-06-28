import mongoose from "mongoose";

// Chat Message Schema
const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "patient"], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Diagnostic Test Result
const testResultSchema = new mongoose.Schema({
  testName: String,
  resultText: String,
  resultImageURL: String,
  format: { type: String, enum: ["image", "pdf", "text"], default: "text" },
  tokenCost: { type: Number, default: 0 } // NEW
});

// Diagnosis Evaluation Report
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

// Initial Diagnosis Info
const initialDiagnosisSchema = new mongoose.Schema({
  clinicalReasoning: String,
  preliminaryDiagnosis: String,
  initialMedications: [String],
  submittedAt: { type: Date, default: Date.now }
});

// Final Diagnosis Info
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

// Main Session Schema
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

  // NEW: Outcome metrics
  tokensSpent: { type: Number, default: 0 },
  tokensEarned: { type: Number, default: 0 },
  successPointsEarned: { type: Number, default: 0 },
  outcome: { type: String, enum: ["cured", "chronic", "deceased"], default: "chronic" },

  // Flags for gamification
  isFollowUp: { type: Boolean, default: false },
  countedInStats: { type: Boolean, default: false }, // Helps with performance analytics

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Session", sessionSchema);
