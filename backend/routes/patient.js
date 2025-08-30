import express from "express";
import { generatePatient, generatePatients } from "../controllers/patientController.js";

const router = express.Router();

router.post("/generate", generatePatient);
router.post("/all-patients", generatePatients)
export default router;
