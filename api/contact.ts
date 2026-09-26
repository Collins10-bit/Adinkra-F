import type { Request, Response } from 'express';
import {
  checkRateLimit,
  sanitizeInput,
  validateContactPayload,
  sendContactEmail,
} from '../src/api/contactHandler.ts';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a few moments before trying again.',
    });
  }

  const { fullName, telephone, email, subject, enquiryType, message, consent, honeypot } = req.body || {};

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
    return res.status(200).json(result);
  } catch (err) {
    console.error('Serverless contact error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to process enquiry. Please call us directly at +233244902287.',
    });
  }
}
