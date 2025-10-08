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

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    const subject = `New AI Readiness Submission: ${data.name}`;
    const lines = [
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
    ];
    const text = lines.join('\n');
    const html = `<pre style="font:14px/1.5 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace">${text}</pre>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM!,
        to: process.env.EMAIL_TO!,
        subject,
        text,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Resend HTTP ${res.status}: ${body}`);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error('Questionnaire email error:', err);
    const msg =
      err?.issues?.[0]?.message || err?.message || 'Invalid request';
    return NextResponse.json({ ok: false, error: msg }, { status: 400 });
  }
}
