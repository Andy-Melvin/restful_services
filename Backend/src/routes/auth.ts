import express from 'express';
import {
  login,
  register,
  logout,
} from '../controllers/auth';

import { validate } from '../middlewares/validate.middleware';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../schema/auth.schema';

const router = express.Router();

/* ========== AUTH ROUTES ========== */
router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

/* ========== EMAIL/PASSWORD AUTH ROUTES ========== */
router.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);

export default router;
