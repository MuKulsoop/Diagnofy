import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mainDiseases: [String],           // Ground truth diseases
  criticalFactors: [String],        // Key factors for AI answers
  symptoms: [String],
  emotionalState: String,
  history: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // NEW: Health score tracking
  initialHealthScore: { type: Number, default: 100 },
  currentHealthScore: { type: Number, default: 100 },

  // NEW: Recovery status
  isCured: { type: Boolean, default: false },
  isChronic: { type: Boolean, default: false },
  isDeceased: { type: Boolean, default: false },

  // NEW: Chronic follow-ups
  ongoingSessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Patient", patientSchema);
