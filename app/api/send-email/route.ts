// app/api/send-email/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const isNonEmpty = (v?: string) => typeof v === 'string' && v.trim().length > 0;

export async function POST(request: Request) {
  try {
    const { RESEND_API_KEY, FROM_EMAIL, TO_EMAIL, VERCEL_ENV } = process.env;

    // Ensure email service is configured in the current environment
    if (!isNonEmpty(RESEND_API_KEY) || !isNonEmpty(FROM_EMAIL) || !isNonEmpty(TO_EMAIL)) {
      console.error('Email env missing', {
        env: VERCEL_ENV,
        hasKey: isNonEmpty(RESEND_API_KEY),
        hasFrom: isNonEmpty(FROM_EMAIL),
        hasTo: isNonEmpty(TO_EMAIL),
      });
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
    }

    const { name, email, company, service, message } = await request.json();

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    const resend = new Resend(RESEND_API_KEY!.trim());
    const htmlMessage = String(message).replace(/\n/g, '<br>');

    const { error } = await resend.emails.send({
      from: FROM_EMAIL!.trim(),     // must be on your verified Resend domain
      to: TO_EMAIL!.trim(),
      reply_to: email,              // reply-to user’s address
      subject: `New Contact Form Submission - ${service}`,
      text:
`Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service: ${service}

Message:
${message}`,
      html:
`<h2>New Contact Form Submission</h2>
<p><strong>Service Requested:</strong> ${service}</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${htmlMessage}</p>`,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (err: any) {
    console.error('send-email 500:', err?.response?.body || err?.message || err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
