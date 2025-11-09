import { NextRequest, NextResponse } from 'next/server';
import { sendContactEmail, isValidEmail, ContactFormData } from '@/lib/email';

// Simple in-memory rate limiting store
// In production, consider using Redis or a database
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 requests per window

/**
 * Get client IP address from request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const ip = forwarded?.split(',')[0] || realIP || request.ip || 'unknown';
  return ip;
}

/**
 * Check if IP is rate limited
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  // Reset if window has passed
  if (now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  // Check if limit exceeded
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  // Increment count
  record.count++;
  return false;
}

/**
 * Clean up old rate limit entries (run periodically)
 */
function cleanupRateLimitStore() {
  const now = Date.now();
  const entries = Array.from(rateLimitStore.entries());
  for (const [ip, record] of entries) {
    if (now > record.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}

// Clean up every 30 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 30 * 60 * 1000);
}

/**
 * Validate contact form data
 */
function validateContactData(data: any): { valid: boolean; error?: string; cleaned?: ContactFormData } {
  // Check if data exists
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Invalid request data' };
  }

  // Check required fields
  const { name, email, subject, message, website } = data;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }

  if (name.trim().length > 100) {
    return { valid: false, error: 'Name is too long' };
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { valid: false, error: 'Email is required' };
  }

  // Validate email format
  if (!isValidEmail(email.trim())) {
    return { valid: false, error: 'Invalid email address' };
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    return { valid: false, error: 'Subject is required' };
  }

  if (subject.trim().length > 200) {
    return { valid: false, error: 'Subject is too long' };
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return { valid: false, error: 'Message is required' };
  }

  if (message.trim().length > 5000) {
    return { valid: false, error: 'Message is too long' };
  }

  // Bot protection: honeypot field (website field should be empty)
  if (website && website.trim().length > 0) {
    // This is likely a bot, silently reject
    return { valid: false, error: 'Invalid request' };
  }

  // Check for suspicious patterns (common spam indicators)
  const suspiciousPatterns = [
    /http[s]?:\/\/[^\s]+/gi, // URLs (some are ok, but multiple might be spam)
    /[A-Z]{10,}/, // Multiple uppercase letters
    /\d{10,}/, // Long number sequences (might be phone numbers, but suspicious)
  ];

  const urlMatches = message.match(/http[s]?:\/\/[^\s]+/gi);
  if (urlMatches && urlMatches.length > 3) {
    return { valid: false, error: 'Message contains too many links' };
  }

  return {
    valid: true,
    cleaned: {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    },
  };
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP(request);

    // Check rate limit
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate data
    const validation = validateContactData(body);
    if (!validation.valid || !validation.cleaned) {
      // Don't reveal specific validation errors to prevent information leakage
      // Return a generic error message
      return NextResponse.json(
        { error: validation.error || 'Invalid form data' },
        { status: 400 }
      );
    }

    // Send email
    const result = await sendContactEmail(validation.cleaned);

    if (!result.success) {
      console.error('Failed to send email:', result.error);
      return NextResponse.json(
        { error: result.error || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error in contact API:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

