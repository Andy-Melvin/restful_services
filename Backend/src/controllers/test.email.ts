import { Request, Response, NextFunction } from 'express';
import { sendOtpEmail, sendResetPasswordEmail } from '../utils/email';

export async function testSendOtp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendOtpEmail(email, otp);
    res.status(200).json({ message: `OTP sent to ${email}` });
  } catch (err) {
    next(err);
  }
}

export async function testSendReset(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const token = 'test-reset-token'; // in real use, generate a JWT or UUID
    await sendResetPasswordEmail(email, token);
    res.status(200).json({ message: `Reset email sent to ${email}` });
  } catch (err) {
    next(err);
  }
}
