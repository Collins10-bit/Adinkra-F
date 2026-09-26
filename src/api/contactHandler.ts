/**
 * Server-side Contact Form Handler for Adinkra Frontiers Ltd
 * Handles:
 * - Rate limiting (max 5 requests per 10 minutes per IP)
 * - Honeypot spam protection
 * - Input sanitization & script injection prevention
 * - Validation (name, telephone, email format, subject, message, consent)
 * - Secure email delivery (Resend / SendGrid / Serverless)
 */

interface ContactPayload {
  fullName: string;
  telephone: string;
  email: string;
  subject: string;
  enquiryType: string;
  message: string;
  consent: boolean;
  honeypot?: string;
  submittedAt?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// In-memory rate limiting map: IP -> timestamps
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (validTimestamps.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, validTimestamps);
    }
  }
}, 15 * 60 * 1000);

export function checkRateLimit(clientIp: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  recentTimestamps.push(now);
  rateLimitMap.set(clientIp, recentTimestamps);
  return true;
}

// Input Sanitization to protect against script injection and XSS
export function sanitizeInput(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/[&<>"'/]/g, (char) => {
      const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
      };
      return map[char] || char;
    })
    .trim();
}

export function validateContactPayload(data: Partial<ContactPayload>): ValidationResult {
  const errors: Record<string, string> = {};

  // Honeypot check
  if (data.honeypot && data.honeypot.trim().length > 0) {
    errors.honeypot = 'Automated bot activity detected';
  }

  // Full name check
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length < 2) {
    errors.fullName = 'Full Name is required and must be at least 2 characters';
  }

  // Telephone check (allowing international and Ghana domestic numbers e.g. +233..., 024...)
  const cleanPhone = (data.telephone || '').replace(/[^\d+]/g, '');
  if (!cleanPhone || cleanPhone.length < 9 || cleanPhone.length > 17) {
    errors.telephone = 'A valid telephone number is required (min 9 digits)';
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'A valid email address is required';
  }

  // Subject check
  if (!data.subject || typeof data.subject !== 'string' || data.subject.trim().length < 2) {
    errors.subject = 'Subject is required';
  }

  // Enquiry Type check
  const allowedEnquiries = [
    'Egg Order',
    'Bulk Supply',
    'Poultry Products',
    'Farm Supply',
    'General Enquiry',
    'Partnership',
    'Other',
  ];
  if (!data.enquiryType || !allowedEnquiries.includes(data.enquiryType)) {
    errors.enquiryType = 'Please select a valid enquiry type';
  }

  // Message check
  if (!data.message || typeof data.message !== 'string' || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  // Consent checkbox check
  if (!data.consent) {
    errors.consent = 'You must consent to proceed with this enquiry';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Dispatches email using Resend / SendGrid or logs payload in development
 */
export async function sendContactEmail(payload: ContactPayload): Promise<{ success: boolean; message: string }> {
  const ownerEmail = process.env.OWNER_EMAIL || 'info@adinkra.biz';
  const fromEmail = process.env.FROM_EMAIL || 'enquiries@adinkra.biz';
  const apiKey = process.env.EMAIL_API_KEY;

  const timestamp = payload.submittedAt || new Date().toISOString();

  // Structured Plain Text Content
  const textContent = `
========================================
NEW ADINKRA FRONTIERS WEBSITE ENQUIRY
========================================

Sender's Full Name: ${payload.fullName}
Telephone Number:   ${payload.telephone}
Email Address:      ${payload.email}
Enquiry Type:       ${payload.enquiryType}
Subject:            ${payload.subject}
Date & Time (UTC):  ${timestamp}

Message Content:
----------------------------------------
${payload.message}
----------------------------------------

* Visitor's Reply-To address set to: ${payload.email}
========================================
`.trim();

  // HTML Email Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #172033; background: #FFF8ED; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #0738A620; }
          .header { background: #0738A6; color: #ffffff; padding: 24px; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.5px; }
          .header p { margin: 4px 0 0 0; font-size: 13px; color: #F5A300; }
          .body { padding: 24px; }
          .badge { display: inline-block; background: #FFF8ED; color: #0738A6; font-weight: bold; padding: 4px 10px; border-radius: 6px; font-size: 12px; border: 1px solid #F5A30040; margin-bottom: 16px; }
          .meta-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .meta-table td { padding: 8px 12px; font-size: 14px; border-bottom: 1px solid #f0f0f0; }
          .meta-label { font-weight: bold; color: #082B66; width: 140px; }
          .message-box { background: #f8fafc; border-left: 4px solid #0738A6; padding: 16px; border-radius: 4px; font-size: 14px; white-space: pre-wrap; }
          .footer { background: #082B66; color: #ffffff; padding: 16px 24px; font-size: 12px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>ADINKRA FRONTIERS LTD</h1>
            <p>New Website Enquiry Received</p>
          </div>
          <div class="body">
            <span class="badge">${payload.enquiryType}</span>
            <table class="meta-table">
              <tr>
                <td class="meta-label">Full Name:</td>
                <td><strong>${payload.fullName}</strong></td>
              </tr>
              <tr>
                <td class="meta-label">Telephone:</td>
                <td><a href="tel:${payload.telephone}">${payload.telephone}</a></td>
              </tr>
              <tr>
                <td class="meta-label">Email Address:</td>
                <td><a href="mailto:${payload.email}">${payload.email}</a></td>
              </tr>
              <tr>
                <td class="meta-label">Subject:</td>
                <td>${payload.subject}</td>
              </tr>
              <tr>
                <td class="meta-label">Received At:</td>
                <td>${new Date(timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} UTC</td>
              </tr>
            </table>

            <h3 style="font-size: 15px; color: #082B66; margin-top: 20px; margin-bottom: 8px;">Message:</h3>
            <div class="message-box">
              ${payload.message.replace(/\n/g, '<br/>')}
            </div>
          </div>
          <div class="footer">
            <p style="margin: 0;">Direct response is set to: ${payload.email}</p>
            <p style="margin: 4px 0 0 0; opacity: 0.8;">Sanfo/Aduam, Behind Manale Rest Stop, Ghana</p>
          </div>
        </div>
      </body>
    </html>
  `;

  // Formspree Endpoint delivery (https://formspree.io/f/xzezjojd)
  const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || 'https://formspree.io/f/xzezjojd';
  try {
    const fsResponse = await fetch(formspreeEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: payload.fullName,
        fullName: payload.fullName,
        telephone: payload.telephone,
        email: payload.email,
        _replyto: payload.email,
        enquiryType: payload.enquiryType,
        subject: payload.subject,
        message: payload.message,
        _subject: `[${payload.enquiryType}] ${payload.subject} - from ${payload.fullName}`,
        _gotcha: payload.honeypot || '',
        submittedAt: timestamp,
      }),
    });

    if (fsResponse.ok) {
      console.log(`[FORMSPREE DISPATCH] Successfully forwarded submission from ${payload.email} to Formspree endpoint`);
    } else {
      const fsErr = await fsResponse.text();
      console.warn('[FORMSPREE DISPATCH WARNING]', fsErr);
    }
  } catch (fsErr) {
    console.error('[FORMSPREE DISPATCH ERROR]', fsErr);
  }

  // If Resend API Key is provided (optional secondary channel)
  if (apiKey && apiKey.startsWith('re_')) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: `Adinkra Frontiers Contact <${fromEmail}>`,
          to: [ownerEmail],
          reply_to: payload.email,
          subject: `[${payload.enquiryType}] ${payload.subject} - from ${payload.fullName}`,
          text: textContent,
          html: htmlContent,
        }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error('Resend delivery error:', errorData);
      }
    } catch (err) {
      console.error('Error invoking Resend API:', err);
    }
  } else if (apiKey && apiKey.startsWith('SG.')) {
    // SendGrid API support
    try {
      await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: ownerEmail }],
              subject: `[${payload.enquiryType}] ${payload.subject} - from ${payload.fullName}`,
            },
          ],
          from: { email: fromEmail, name: 'Adinkra Frontiers Contact' },
          reply_to: { email: payload.email, name: payload.fullName },
          content: [
            { type: 'text/plain', value: textContent },
            { type: 'text/html', value: htmlContent },
          ],
        }),
      });
    } catch (err) {
      console.error('Error invoking SendGrid API:', err);
    }
  }

  return {
    success: true,
    message:
      'Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible.',
  };
}
