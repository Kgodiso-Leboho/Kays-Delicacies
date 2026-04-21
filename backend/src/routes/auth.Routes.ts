import express from 'express';
import { getDataOfLoggedInUser, loginUser, logoutUser, registerUser } from '../controllers/auth.Controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = express.Router();
import { apiLimiter } from '../utils/rateLimiter.js';

// Apply rate limiter to all auth routes
router.use(apiLimiter);

// Register a new user
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Get current user info
router.get('/me', authMiddleware , getDataOfLoggedInUser)

// User Logout
router.post('/logout', logoutUser);

export default router;