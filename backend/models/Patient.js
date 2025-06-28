import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  mainDiseases: [String],
  criticalFactors: [String],
  symptoms: [String],
  emotionalState: String,
  history: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Patient", patientSchema);
