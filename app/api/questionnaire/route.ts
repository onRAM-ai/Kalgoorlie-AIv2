// app/api/questionnaire/route.ts
import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

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

const TO = process.env.EMAIL_TO || process.env.TO_EMAIL;
const FROM = process.env.EMAIL_FROM || process.env.FROM_EMAIL;

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());
    if (!TO || !FROM) throw new Error('Missing EMAIL_TO/EMAIL_FROM (or TO_EMAIL/FROM_EMAIL)');

    const subject = `New AI Readiness Submission: ${data.name}`;
    const text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone ?? ''}`,
      `AI Usage: ${data.currentAI}`,
      `Computer Usage: ${data.computerUsage}`,
      `Admin Time: ${data.adminTime}`,
      `Frustrations: ${
        data.frustrations === 'Other'
          ? `Other: ${data.otherFrustrations ?? ''}`
          : data.frustrations
      }`,
    ].join('\n');
    const html = `<pre style="font:14px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace">${text}</pre>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${await res.text()}`);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Questionnaire email error:', err);
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 400 });
  }
}
