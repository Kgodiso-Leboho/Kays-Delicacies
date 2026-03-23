import express from 'express';
import { registerUser } from '../controllers/auth.Controller.js';
const router = express.Router();

// Register a new user
router.post('register', registerUser)

export default router;