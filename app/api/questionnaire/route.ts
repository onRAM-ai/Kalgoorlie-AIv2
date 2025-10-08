import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

// Validation schema
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  currentAI: z.string().min(1),
  computerUsage: z.string().min(1),
  adminTime: z.string().min(1),
  frustrations: z.string().min(1),
  otherFrustrations: z.string().optional(),
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    // Build message
    const subject = `New AI Readiness Submission: ${data.name}`;
    const text = `
New Submission Details

Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone ?? ''}

AI Usage: ${data.currentAI}
Computer Usage: ${data.computerUsage}
Admin Time: ${data.adminTime}
Frustrations: ${
      data.frustrations === 'Other'
        ? `Other: ${data.otherFrustrations ?? ''}`
        : data.frustrations
    }
`;

    const html = `
<h2>New AI Readiness Submission</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone ?? ''}</p>
<hr>
<p><strong>AI Usage:</strong> ${data.currentAI}</p>
<p><strong>Computer Usage:</strong> ${data.computerUsage}</p>
<p><strong>Admin Time:</strong> ${data.adminTime}</p>
<p><strong>Frustrations:</strong> ${
      data.frustrations === 'Other'
        ? `Other: ${data.otherFrustrations ?? ''}`
        : data.frustrations
    }</p>
`;

    // Send email
    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!, // verified sender
      to: process.env.EMAIL_TO!,     // your inbox
      subject,
      text,
      html,
    });

    if (error) throw new Error(error.message || 'Resend send failed');

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Questionnaire email error:', err);
    return NextResponse.json(
      { ok: false, error: err?.message || 'Failed to send' },
      { status: 400 }
    );
  }
}
