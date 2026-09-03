import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_REQUEST_BYTES = 16_384;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(150).optional().default(''),
  service: z.enum(['AI Consulting', 'AI Training & Workshops']),
  message: z.string().trim().min(1).max(4_000),
  website: z.string().max(200).optional().default(''),
}).strict();

const isNonEmpty = (value?: string) => typeof value === 'string' && value.trim().length > 0;

const escapeHtml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function clientIdentifier(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

function isRateLimited(identifier: string) {
  const now = Date.now();
  const activeRequests = (rateLimitStore.get(identifier) || [])
    .filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (activeRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(identifier, activeRequests);
    return true;
  }

  activeRequests.push(now);
  rateLimitStore.set(identifier, activeRequests);
  return false;
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const allowedOrigins = new Set([
    new URL(request.url).origin,
    'https://www.onram.ai',
    'https://onram.ai',
  ]);

  if (process.env.VERCEL_URL) {
    allowedOrigins.add(`https://${process.env.VERCEL_URL}`);
  }

  return allowedOrigins.has(origin);
}

export async function POST(request: NextRequest) {
  try {
    if (!isAllowedOrigin(request)) {
      return NextResponse.json({ error: 'Request not allowed' }, { status: 403 });
    }

    if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    const declaredLength = Number(request.headers.get('content-length') || 0);
    if (declaredLength > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).length > MAX_REQUEST_BYTES) {
      return NextResponse.json({ error: 'Request too large' }, { status: 413 });
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(parsedBody);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Please check the form and try again' }, { status: 400 });
    }

    const { name, email, company, service, message, website } = parsed.data;

    // Silently accept submissions that fill the hidden bot field.
    if (website) {
      return NextResponse.json({ message: 'Email sent successfully' });
    }

    if (isRateLimited(clientIdentifier(request))) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again shortly.' },
        { status: 429, headers: { 'Retry-After': '600' } },
      );
    }

    const { RESEND_API_KEY, FROM_EMAIL, TO_EMAIL, VERCEL_ENV } = process.env;
    if (!isNonEmpty(RESEND_API_KEY) || !isNonEmpty(FROM_EMAIL) || !isNonEmpty(TO_EMAIL)) {
      console.error('Email configuration missing', {
        environment: VERCEL_ENV,
        hasApiKey: isNonEmpty(RESEND_API_KEY),
        hasFromAddress: isNonEmpty(FROM_EMAIL),
        hasToAddress: isNonEmpty(TO_EMAIL),
      });
      return NextResponse.json({ error: 'Email service unavailable' }, { status: 503 });
    }

    const text = `Name: ${name}\nEmail: ${email}\nBusiness: ${company || 'Not provided'}\nService: ${service}\n\nMessage:\n${message}`;
    const html = `<h2>New onram AI website enquiry</h2>
<p><strong>Service:</strong> ${escapeHtml(service)}</p>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Business:</strong> ${escapeHtml(company || 'Not provided')}</p>
<h3>Message</h3>
<p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY!.trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL!.trim(),
        to: [TO_EMAIL!.trim()],
        reply_to: email,
        subject: `New onram AI enquiry — ${service}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error('Resend request failed', { status: response.status });
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form request failed', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
