import { Resend } from 'resend';

// Lazy initialization of Resend client to avoid build-time errors
// The client will only be created when actually needed (at runtime)
let resend: Resend | null = null;

function getResendClient(): Resend {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

// Use your verified domain email. If FROM_EMAIL is not set, default to your domain
// IMPORTANT: You must use an email from your verified domain (bernardarikuoko.com.ng)
// to send emails to recipients other than your Resend account email
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@bernardarikuoko.com.ng';
const TO_EMAIL = 'bernardarikuoko@gmail.com';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Validates email format using a comprehensive regex pattern
 */
export function isValidEmail(email: string): boolean {
  // Trim whitespace
  const trimmedEmail = email.trim();
  
  // Basic regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return false;
  }

  // Check email length (reasonable limits)
  if (trimmedEmail.length > 254) { // RFC 5321 limit
    return false;
  }

  // Check for valid domain structure
  const parts = trimmedEmail.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [localPart, domain] = parts;
  
  // Local part validation
  if (localPart.length === 0 || localPart.length > 64) {
    return false;
  }

  // Check local part for invalid patterns
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return false;
  }
  
  // Check for consecutive dots in local part
  if (localPart.includes('..')) {
    return false;
  }

  // Domain validation
  if (domain.length === 0 || domain.length > 253) {
    return false;
  }

  // Check if domain has at least one dot (has TLD)
  if (!domain.includes('.')) {
    return false;
  }

  // Check domain for invalid patterns
  if (domain.startsWith('.') || domain.startsWith('-') || domain.endsWith('.') || domain.endsWith('-')) {
    return false;
  }

  // Check for consecutive dots or dashes in domain
  if (domain.includes('..') || domain.includes('--')) {
    return false;
  }

  // Check for valid TLD (at least 2 characters after last dot, and must be alphanumeric)
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2 || !/^[a-zA-Z0-9]+$/.test(tld)) {
    return false;
  }

  // Check each domain part is valid (alphanumeric and hyphens, but not starting/ending with hyphen)
  for (const part of domainParts) {
    if (part.length === 0) {
      return false;
    }
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(part)) {
      return false;
    }
  }

  return true;
}

/**
 * Sends a contact form email using Resend
 */
export async function sendContactEmail(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return { success: false, error: 'Email service is not configured' };
    }

    // Validate email
    if (!isValidEmail(data.email)) {
      return { success: false, error: 'Invalid email address' };
    }

    // Get Resend client (lazy initialization)
    const resendClient = getResendClient();

    // Send email
    const result = await resendClient.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: data.email,
      subject: `Contact Form: ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border: 1px solid #e5e7eb;
                border-top: none;
                border-radius: 0 0 8px 8px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #374151;
                margin-bottom: 5px;
                display: block;
              }
              .value {
                color: #1f2937;
                padding: 10px;
                background: white;
                border-radius: 4px;
                border: 1px solid #d1d5db;
              }
              .message {
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Name:</span>
                <div class="value">${escapeHtml(data.name)}</div>
              </div>
              <div class="field">
                <span class="label">Email:</span>
                <div class="value">${escapeHtml(data.email)}</div>
              </div>
              <div class="field">
                <span class="label">Subject:</span>
                <div class="value">${escapeHtml(data.subject)}</div>
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="value message">${escapeHtml(data.message)}</div>
              </div>
              <div class="footer">
                <p>This email was sent from your portfolio contact form.</p>
                <p>You can reply directly to this email to respond to ${escapeHtml(data.name)}.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This email was sent from your portfolio contact form.
You can reply directly to this email to respond to ${data.name}.
      `,
    });

    if (result.error) {
      console.error('Resend API error:', result.error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}

/**
 * Escapes HTML to prevent XSS attacks
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

