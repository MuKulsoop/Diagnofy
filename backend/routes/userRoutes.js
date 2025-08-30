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
 // api call for patient recent activity /:id/user-recent-cases
 // have to make an api which can give some dashboard analytics of the user like case completed, average score, study hours, current streak - /:id/user-dashboard-stats
export default router;