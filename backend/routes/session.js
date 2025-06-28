import express from "express";
import {
  startSession,
  chatWithPatient,
  requestTests,
  analyzeSession,
  submitFinalDiagnosis, 
  submitInitialDiagnosis
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/start", startSession);
router.post("/:id/chat", chatWithPatient);
router.post("/:id/request-tests", requestTests); 
router.post("/:id/analyze", analyzeSession);
router.post("/:id/submit-initial", submitInitialDiagnosis);
router.post("/:id/submit-final", submitFinalDiagnosis);

export default router;