import Session from "../models/Session.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getTestAsset } from "../utils/testImageMap.js";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🟢 Start a new session
export const startSession = async (req, res) => {
  const { userId, patientId, level, specialization, isFollowUp = false } = req.body;

  try {
    const session = new Session({
      user: userId,
      patient: patientId,
      level,
      specialization,
      isFollowUp,
      messages: []
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: "Failed to start session", error: err.message });
  }
};

// 💬 Chat with patient
export const chatWithPatient = async (req, res) => {
  const sessionId = req.params.id;
  const { message } = req.body;

  try {
    const session = await Session.findById(sessionId).populate("patient");
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.messages.push({ sender: "user", text: message });

    const patient = session.patient;
    const prompt = `
You are acting as a patient in a clinical simulation.
Speak ONLY as the patient. Use natural first-person replies.

Patient Info:
- Age: ${patient.age}
- Gender: ${patient.gender}
- Emotional State: ${patient.emotionalState}
- Symptoms: ${patient.symptoms.join(", ")}
- History: ${patient.history}

Conversation:
${session.messages.map(m => `${m.sender === "user" ? "Doctor" : "Patient"}: ${m.text}`).join("\n")}
Doctor: ${message}
Patient:`;

    const result = await model.generateContent(prompt);
    const reply = (await result.response.text()).trim();

    session.messages.push({ sender: "patient", text: reply });
    await session.save();

    res.json({ reply, fullConversation: session.messages });
  } catch (err) {
    res.status(500).json({ message: "Chat failed", error: err.message });
  }
};

// 🧪 Request tests with token deduction
export const requestTests = async (req, res) => {
  const sessionId = req.params.id;
  const { tests } = req.body;

  try {
    const session = await Session.findById(sessionId).populate("patient user");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const user = session.user;
    const tokenCostPerTest = 5;
    const totalCost = tests.length * tokenCostPerTest;

    if (user.tokens < totalCost) {
      return res.status(400).json({ message: "Insufficient tokens" });
    }

    user.tokens -= totalCost;
    await user.save();

    const testResults = [];

    for (const test of tests) {
      const prompt = `
You are a medical assistant. Generate a test result for:
Test: ${test}
Patient: Age ${session.patient.age}, Gender: ${session.patient.gender}
Disease: ${session.patient.mainDiseases.join(", ")}
Symptoms: ${session.patient.symptoms.join(", ")}

Output clinical findings only.
`;

      const result = await model.generateContent(prompt);
      const resultText = (await result.response.text()).trim();

      const asset = getTestAsset(test, session.patient.mainDiseases.join(", "));

      testResults.push({
        testName: test,
        resultText,
        resultImageURL: asset?.url || "",
        format: asset?.format || "text",
        tokenCost: tokenCostPerTest
      });
    }

    session.testResults = testResults;
    session.tokensSpent += totalCost;
    await session.save();

    res.json({ message: "Test results generated", testResults });
  } catch (err) {
    res.status(500).json({ message: "Test generation failed", error: err.message });
  }
};

// 🧠 Analyze session and update gamified rewards
export const analyzeSession = async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await Session.findById(sessionId).populate("patient user");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const { patient, user, messages, testResults, initialDiagnosis, finalDiagnosis } = session;
    if (!initialDiagnosis || !finalDiagnosis) {
      return res.status(400).json({ message: "Both initial and final diagnoses must be submitted before analysis." });
    }

    // -- Prompts
    const getPrompt = (phase, diagnosis) => `
You are evaluating the ${phase} diagnosis.
Patient Info: Age ${patient.age}, Gender: ${patient.gender}, Symptoms: ${patient.symptoms.join(", ")}
Diagnosis: ${JSON.stringify(diagnosis)}
Chat: ${messages.map(m => `${m.sender === "user" ? "Doctor" : "Patient"}: ${m.text}`).join("\n")}
Return JSON feedback using the given format.
`;

    const initialResult = await model.generateContent(getPrompt("initial", initialDiagnosis));
    const initialParsed = JSON.parse(initialResult.response.text().replace(/```json|```/g, "").trim());

    const finalResult = await model.generateContent(getPrompt("final", finalDiagnosis));
    const finalParsed = JSON.parse(finalResult.response.text().replace(/```json|```/g, "").trim());

    // -- Update diagnosis report
    session.initialDiagnosisReport = initialParsed;
    session.finalDiagnosisReport = finalParsed;

    // -- Score processing
    const score = finalParsed.overallScore || 0;
    let successPoints = 0;
    let earnedTokens = 0;
    let outcome = "chronic";
    let healthChange = 0;

    if (score >= 8) {
      outcome = "cured";
      successPoints = 20;
      earnedTokens = 15;
      healthChange = +30;
      patient.isCured = true;
    } else if (score <= 3) {
      outcome = "deceased";
      successPoints = -10;
      earnedTokens = 0;
      healthChange = -50;
      patient.isDeceased = true;
    } else {
      outcome = "chronic";
      successPoints = 5;
      earnedTokens = 5;
      healthChange = -10;
      patient.isChronic = true;
    }

    patient.currentHealthScore = Math.max(0, patient.currentHealthScore + healthChange);
    session.outcome = outcome;
    session.successPointsEarned = successPoints;
    session.tokensEarned = earnedTokens;
    session.countedInStats = true;

    await patient.save();

    // -- Update user performance
    user.tokens += earnedTokens;
    user.successPoints += successPoints;
    user.totalDiagnosed += 1;
    if (outcome === "cured") user.totalCured += 1;
    if (outcome === "deceased") user.totalDeaths += 1;
    await user.save();

    await session.save();

    res.json({
      message: "Session analyzed successfully",
      successPoints,
      earnedTokens,
      outcome,
      initialDiagnosisReport: initialParsed,
      finalDiagnosisReport: finalParsed
    });

  } catch (err) {
    res.status(500).json({ message: "Analysis failed", error: err.message });
  }
};

// 📝 Submit Initial Diagnosis
export const submitInitialDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { clinicalReasoning, preliminaryDiagnosis, initialMedications } = req.body;

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.initialDiagnosis = {
      clinicalReasoning,
      preliminaryDiagnosis,
      initialMedications
    };

    await session.save();
    res.status(200).json({ message: "Initial diagnosis submitted", initialDiagnosis: session.initialDiagnosis });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};

// 📝 Submit Final Diagnosis
export const submitFinalDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { updatedReasoning, finalDiagnosis, finalMedications, treatmentPlan } = req.body;

  try {
    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.finalDiagnosis = {
      updatedReasoning,
      finalDiagnosis,
      finalMedications,
      treatmentPlan
    };

    await session.save();
    res.status(200).json({ message: "Final diagnosis submitted", finalDiagnosis: session.finalDiagnosis });
  } catch (err) {
    res.status(500).json({ message: "Submission failed", error: err.message });
  }
};
