import { Router } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'Test email route working' });
});

router.post('/send', async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: subject || 'Test Email',
      text: text || 'This is a test email from your Node.js application'
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'Email sent successfully' });
  } catch (error: any) {
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

export default router;
