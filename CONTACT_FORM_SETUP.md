# Contact Form Setup Guide

This guide explains how to set up the contact form email functionality.

## Overview

The contact form sends emails to `bernardarikuoko@gmail.com` using Resend. It includes:
- Email validation
- Bot protection (honeypot field)
- Rate limiting (3 requests per 15 minutes per IP)
- XSS protection
- Spam detection

## Setup Instructions

### 1. Get Resend API Key

1. Sign up for a free account at [resend.com](https://resend.com)
2. Go to your dashboard and create an API key
3. Copy the API key

### 2. Configure Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Resend API Key (required)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# From Email (REQUIRED if you want to send to recipients other than your Resend account email)
# IMPORTANT: You MUST use an email from your verified domain to send to other recipients
# Example: noreply@bernardarikuoko.com.ng or contact@bernardarikuoko.com.ng
FROM_EMAIL=noreply@bernardarikuoko.com.ng
```

### 3. Verify Your Domain (REQUIRED for Production)

**Why Domain Verification is Required:**

Resend's testing mode (`onboarding@resend.dev`) only allows sending emails to your own Resend account email address. To send emails to other recipients (like `bernardarikuoko@gmail.com`), you **MUST**:

1. Verify your domain in Resend
2. Use an email address from that verified domain in the `FROM_EMAIL` environment variable

**Steps to Verify Your Domain:**

1. Go to your Resend dashboard
2. Navigate to "Domains"
3. Click "Add Domain" and enter your domain (e.g., `bernardarikuoko.com.ng`)
4. Add the DNS records that Resend provides to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)
6. Once verified, update `FROM_EMAIL` in your `.env.local` to use your verified domain email

**Example verified domain emails:**
- `noreply@bernardarikuoko.com.ng`
- `contact@bernardarikuoko.com.ng`
- `hello@bernardarikuoko.com.ng`

Any email address using your verified domain will work!

### 4. Test the Contact Form

1. Start your development server: `pnpm dev`
2. Navigate to the contact section on your portfolio
3. Fill out the form and submit
4. Check your email inbox at `bernardarikuoko@gmail.com`

## Security Features

### Bot Protection

- **Honeypot Field**: A hidden "website" field that bots will fill out, but humans won't see
- **Rate Limiting**: Limits to 3 requests per 15 minutes per IP address
- **Email Validation**: Comprehensive email format validation
- **Spam Detection**: Filters out messages with suspicious patterns (too many URLs, etc.)

### Email Validation

The system validates:
- Email format (RFC compliant)
- Email length limits
- Domain structure
- TLD validity

## API Endpoint

The contact form uses the `/api/contact` endpoint:

- **Method**: POST
- **Content-Type**: application/json
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello, I'd like to discuss a project..."
  }
  ```

## Rate Limiting

- **Window**: 15 minutes
- **Max Requests**: 3 per IP address
- **Response**: 429 Too Many Requests if limit exceeded

## Troubleshooting

### Emails not sending

1. Check that `RESEND_API_KEY` is set in your `.env.local` file
2. Verify the API key is correct in your Resend dashboard
3. Check your Resend account limits (free tier has limits)
4. Check server logs for error messages

### Rate limiting issues

- If you're testing and hitting rate limits, wait 15 minutes or restart your development server (which clears the in-memory rate limit store)

### Bot protection blocking legitimate users

- The honeypot field should be completely invisible to users
- If users are being blocked, check the server logs for the specific error
- Adjust validation rules in `src/app/api/contact/route.ts` if needed

## Production Considerations

For production, consider:

1. **Redis for Rate Limiting**: Replace in-memory rate limiting with Redis for distributed systems
2. **reCAPTCHA**: Add Google reCAPTCHA v3 for additional bot protection
3. **Email Queue**: Use a job queue (like Bull) for email sending to handle high volumes
4. **Monitoring**: Add error tracking (like Sentry) to monitor form submissions
5. **Analytics**: Track form submission success/failure rates

## File Structure

```
src/
├── app/
│   └── api/
│       └── contact/
│           └── route.ts          # API endpoint
├── lib/
│   └── email.ts                  # Email utility functions
└── components/
    └── sections/
        └── Contact.tsx           # Contact form component
```

## Support

If you encounter any issues, check:
1. Resend dashboard for API status
2. Server logs for error messages
3. Browser console for client-side errors
4. Network tab for API request/response details

