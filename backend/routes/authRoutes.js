import express from 'express';
import {
  registerUser,
  loginUser, 
  getUser
} from '../controllers/authControllers.js'

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/me', getUser )

export default router;