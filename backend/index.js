import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import patientRoutes from './routes/patient.js';
import sessionRoutes from './routes/session.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));

app.use("/static/tests", express.static(path.join(__dirname, "assets/tests")));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/sessions', sessionRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Diagnofy API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});