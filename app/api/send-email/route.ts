import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { SENDGRID_API_KEY, FROM_EMAIL, TO_EMAIL } = process.env;

    // Ensure server is configured correctly
    if (!SENDGRID_API_KEY || !FROM_EMAIL || !TO_EMAIL) {
      console.error('Missing env vars', {
        hasKey: !!SENDGRID_API_KEY,
        hasFrom: !!FROM_EMAIL,
        hasTo: !!TO_EMAIL,
      });
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const { name, email, company, service, message } = await request.json();

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const htmlMessage = String(message).replace(/\n/g, '<br>');

    await sgMail.send({
      to: TO_EMAIL,
      from: FROM_EMAIL, // must be a verified sender/domain in SendGrid
      replyTo: email,
      subject: `New Contact Form Submission - ${service}`,
      text: `
Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Service: ${service}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Service Requested:</strong> ${service}</p>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Company:</strong> ${company || 'Not provided'}</p>
<h3>Message:</h3>
<p>${htmlMessage}</p>
      `,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    // Surface SendGrid error details to logs
    console.error('SendGrid Error:', error?.response?.body || error?.message || error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
