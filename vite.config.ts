import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function contactApiPlugin(): Plugin {
  const rateLimitMap = new Map<string, number[]>();
  const WINDOW_MS = 10 * 60 * 1000;
  const MAX_REQ = 5;

  return {
    name: 'contact-api-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url === '/api/contact') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '127.0.0.1';
              const now = Date.now();
              const timestamps = (rateLimitMap.get(clientIp) || []).filter((t) => now - t < WINDOW_MS);

              if (timestamps.length >= MAX_REQ) {
                res.statusCode = 429;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: false,
                    message: 'Too many requests. Please wait a few moments before trying again.',
                  })
                );
                return;
              }

              timestamps.push(now);
              rateLimitMap.set(clientIp, timestamps);

              const parsed = JSON.parse(body || '{}');

              // Honeypot check
              if (parsed.honeypot && parsed.honeypot.trim().length > 0) {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({
                    success: true,
                    message:
                      'Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible.',
                  })
                );
                return;
              }

              // Validation
              if (!parsed.fullName || parsed.fullName.trim().length < 2) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Please provide a valid full name.' }));
                return;
              }

              const cleanPhone = (parsed.telephone || '').replace(/[^\d+]/g, '');
              if (!cleanPhone || cleanPhone.length < 9) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Please provide a valid telephone number.' }));
                return;
              }

              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!parsed.email || !emailRegex.test(parsed.email.trim())) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Please provide a valid email address.' }));
                return;
              }

              if (!parsed.subject || parsed.subject.trim().length < 2) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Please provide an enquiry subject.' }));
                return;
              }

              if (!parsed.message || parsed.message.trim().length < 10) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(
                  JSON.stringify({ success: false, message: 'Please write a message with at least 10 characters.' })
                );
                return;
              }

              if (!parsed.consent) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'You must consent to proceed.' }));
                return;
              }

              const ownerEmail = process.env.OWNER_EMAIL || 'info@adinkra.biz';
              const fromEmail = process.env.FROM_EMAIL || 'enquiries@adinkra.biz';
              const apiKey = process.env.EMAIL_API_KEY;

              // If real Resend API key is present
              if (apiKey && apiKey.startsWith('re_')) {
                try {
                  await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                      Authorization: `Bearer ${apiKey}`,
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: `Adinkra Frontiers Website <${fromEmail}>`,
                      to: [ownerEmail],
                      reply_to: parsed.email,
                      subject: `[${parsed.enquiryType || 'Enquiry'}] ${parsed.subject} - from ${parsed.fullName}`,
                      text: `Full Name: ${parsed.fullName}\nPhone: ${parsed.telephone}\nEmail: ${parsed.email}\nEnquiry Type: ${parsed.enquiryType}\nSubject: ${parsed.subject}\n\nMessage:\n${parsed.message}\n\nSubmitted at: ${parsed.submittedAt || new Date().toISOString()}`,
                    }),
                  });
                } catch (e) {
                  console.error('Failed to dispatch via Resend:', e);
                }
              } else {
                console.log(
                  `[Adinkra Frontiers Contact] To: ${ownerEmail} | From: ${parsed.fullName} <${parsed.email}> | Phone: ${parsed.telephone} | Type: ${parsed.enquiryType} | Subject: ${parsed.subject}`
                );
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: true,
                  message:
                    'Thank you for contacting Adinkra Frontiers Ltd. Your message has been sent successfully. We will respond as soon as possible.',
                })
              );
            } catch {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  message: 'A server error occurred while processing your message. Please try again.',
                })
              );
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), contactApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
