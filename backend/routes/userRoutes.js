import express from 'express';
import { protect } from '../middlewares/auth.js';
import {
  completeOnboarding,
  getUserProfile
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes
router.use(protect);

router.get('/profile', getUserProfile);
router.put('/onboarding', completeOnboarding);

export default router;