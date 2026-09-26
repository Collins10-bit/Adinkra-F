import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import {
  checkRateLimit,
  sanitizeInput,
  validateContactPayload,
  sendContactEmail,
} from './src/api/contactHandler.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API route for Contact Form submissions
app.post('/api/contact', async (req, res) => {
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket.remoteAddress ||
    '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few moments before trying again.',
    });
  }

  const { fullName, telephone, email, subject, enquiryType, message, consent, honeypot } = req.body;

  // Honeypot check
  if (honeypot && String(honeypot).trim().length > 0) {
    return res.json({
      success: true,
      message:
        'Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible.',
    });
  }

  const sanitized = {
    fullName: sanitizeInput(fullName),
    telephone: sanitizeInput(telephone),
    email: sanitizeInput(email),
    subject: sanitizeInput(subject),
    enquiryType: sanitizeInput(enquiryType),
    message: sanitizeInput(message),
    consent: Boolean(consent),
    honeypot: sanitizeInput(honeypot),
    submittedAt: new Date().toISOString(),
  };

  const validation = validateContactPayload(sanitized);
  if (!validation.isValid) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the highlighted errors.',
      errors: validation.errors,
    });
  }

  try {
    const result = await sendContactEmail(sanitized);
    return res.json(result);
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({
      success: false,
      message: 'A server error occurred while sending your message. Please contact us directly by phone or WhatsApp.',
    });
  }
});

// Serve static assets from production build directory
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Adinkra Frontiers Ltd server running on http://0.0.0.0:${PORT}`);
});
