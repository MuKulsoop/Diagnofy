import express from "express";
import { generatePatient } from "../controllers/patientController.js";

const router = express.Router();

router.post("/generate", generatePatient);

export default router;
