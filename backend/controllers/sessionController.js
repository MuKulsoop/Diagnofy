import Session from "../models/Session.js";
import Patient from "../models/Patient.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { getTestAsset } from "../utils/testImageMap.js";
import dotenv from "dotenv";
dotenv.config();

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// 🟢 Start a new session
export const startSession = async (req, res) => {
  const { userId, patientId, level, specialization } = req.body;

  try {
    const session = new Session({
      user: userId,
      patient: patientId,
      level,
      specialization,
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

    // Add user's message
    session.messages.push({ sender: "user", text: message });

    // Prepare prompt
    const patient = session.patient;
   const prompt = `
You are acting as a patient in a clinical simulation.

🔸 Speak ONLY as the patient. DO NOT include narration, stage directions, or story-like descriptions.
🔸 Reply naturally, briefly, and realistically — like a human answering a doctor's question.
🔸 Use first-person language.

Patient Information:
- Age: ${patient.age}
- Gender: ${patient.gender}
- Emotional State: ${patient.emotionalState}
- Symptoms: ${patient.symptoms.join(", ")}
- History: ${patient.history}

Conversation so far:
${session.messages.map(m => `${m.sender === "user" ? "Doctor" : "Patient"}: ${m.text}`).join("\n")}

Doctor: ${message}
Patient:
`;

    const result = await model.generateContent(prompt);
    const reply = (await result.response.text()).trim();

    // Save patient's reply
    session.messages.push({ sender: "patient", text: reply });
    await session.save();

    res.json({ reply, fullConversation: session.messages });

  } catch (err) {
    res.status(500).json({ message: "Chat failed", error: err.message });
  }
};



export const requestTests = async (req, res) => {
  const sessionId = req.params.id;
  const { tests } = req.body;

  try {
    const session = await Session.findById(sessionId).populate("patient");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const testResults = [];

    for (const test of tests) {
      const prompt = `
You are a medical assistant.

Based on the patient:
- Age: ${session.patient.age}
- Gender: ${session.patient.gender}
- Disease: ${session.patient.mainDiseases.join(", ")}
- Symptoms: ${session.patient.symptoms.join(", ")}
- Critical Factors: ${session.patient.criticalFactors.join(", ")}

Generate a brief, realistic result summary for the test: "${test}"
Only output the findings. Keep it clinical and brief.
`;

      const result = await model.generateContent(prompt);
      const resultText = (await result.response.text()).trim();

      const asset = getTestAsset(test, session.patient.mainDiseases.join(", "));

      testResults.push({
        testName: test,
        resultText,
        resultImageURL: asset?.url || "",
        format: asset?.format || "text"
      });
    }

    session.testResults = testResults;
    await session.save();

    res.json({ message: "Test results generated", testResults });

  } catch (err) {
    res.status(500).json({ message: "Test generation failed", error: err.message });
  }
};



export const analyzeSession = async (req, res) => {
  const sessionId = req.params.id;

  try {
    const session = await Session.findById(sessionId).populate("patient");
    if (!session) return res.status(404).json({ message: "Session not found" });

    const { patient, messages, testResults, initialDiagnosis, finalDiagnosis } = session;

    if (!initialDiagnosis || !finalDiagnosis) {
      return res.status(400).json({ message: "Both initial and final diagnoses must be submitted before analysis." });
    }

    const initialPrompt = `
You are evaluating a MEDICAL TRAINEE'S INITIAL DIAGNOSIS — before any test results.

Patient Info:
- Age: ${patient.age}, Gender: ${patient.gender}
- Symptoms: ${patient.symptoms.join(", ")}
- Critical Factors: ${patient.criticalFactors.join(", ")}

Initial Diagnosis:
- Clinical Reasoning: ${initialDiagnosis.clinicalReasoning}
- Preliminary Diagnosis: ${initialDiagnosis.preliminaryDiagnosis}
- Medications: ${initialDiagnosis.initialMedications.join(", ")}

Conversation History:
${messages.map(m => `${m.sender === "user" ? "Doctor" : "Patient"}: ${m.text}`).join("\n")}

Rate the trainee's INITIAL diagnosis phase out of 10 using this format:

\`\`\`json
{
  "questioningScore": 8,
  "questioningFeedback": "Good questioning overall, but timeline of symptoms could be clearer.",
  "diagnosisScore": 7,
  "diagnosisFeedback": "Preliminary diagnosis was close but missed key differential.",
  "treatmentScore": 6,
  "treatmentFeedback": "Prescription was okay but lacked cautionary advice.",
  "overallScore": 7,
  "summaryFeedback": "Decent attempt with good direction.",
  "strengths": ["Empathy", "Basic diagnostic skill"],
  "areasToImprove": ["Differential diagnosis", "Patient education"]
}
\`\`\`
`;

    const finalPrompt = `
You are evaluating the FINAL DIAGNOSIS made by a MEDICAL TRAINEE — after reviewing test results.

Patient Info:
- Age: ${patient.age}, Gender: ${patient.gender}
- Symptoms: ${patient.symptoms.join(", ")}
- Diseases: ${patient.mainDiseases.join(", ")}
- Critical Factors: ${patient.criticalFactors.join(", ")}

Test Results:
${testResults.map(t => `Test: ${t.testName}\nFindings: ${t.resultText}`).join("\n\n")}

Final Diagnosis:
- Updated Reasoning: ${finalDiagnosis.updatedReasoning}
- Final Diagnosis: ${finalDiagnosis.finalDiagnosis}
- Final Medications: ${finalDiagnosis.finalMedications.join(", ")}
- Lifestyle Recommendations: ${finalDiagnosis.treatmentPlan?.lifestyleRecommendations}
- Follow-Up Instructions: ${finalDiagnosis.treatmentPlan?.followUpInstructions}

Chat Summary:
${messages.map(m => `${m.sender === "user" ? "Doctor" : "Patient"}: ${m.text}`).join("\n")}

Rate the FINAL diagnostic quality out of 10 using the same format:

\`\`\`json
{
  ...
}
\`\`\`
`;

    // Run both Gemini evaluations
    const initialResult = await model.generateContent(initialPrompt);
    const initialText = (await initialResult.response.text()).trim();
    const initialJsonMatch = initialText.match(/```json([\s\S]*?)```/);
    const initialParsed = initialJsonMatch ? JSON.parse(initialJsonMatch[1]) : null;

    const finalResult = await model.generateContent(finalPrompt);
    const finalText = (await finalResult.response.text()).trim();
    const finalJsonMatch = finalText.match(/```json([\s\S]*?)```/);
    const finalParsed = finalJsonMatch ? JSON.parse(finalJsonMatch[1]) : null;

    if (!initialParsed || !finalParsed) {
      return res.status(400).json({ message: "Invalid response from Gemini. Couldn't extract both analysis reports." });
    }

    // Save to session
    session.initialDiagnosisReport = initialParsed;
    session.finalDiagnosisReport = finalParsed;
    await session.save();

    res.json({
      message: "Session analyzed successfully",
      initialDiagnosisReport: initialParsed,
      finalDiagnosisReport: finalParsed
    });

  } catch (err) {
    res.status(500).json({ message: "Analysis failed", error: err.message });
  }
};


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
