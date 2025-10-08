import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

export const runtime = 'nodejs';

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  currentAI: z.string().min(1),
  computerUsage: z.string().min(1),
  adminTime: z.string().min(1),
  frustrations: z.string().min(1),
});

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const data = schema.parse(await req.json());

    const subject = `New AI Readiness Questionnaire: ${data.name}`;
    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone ?? ''}`,
      `Current AI: ${data.currentAI}`,
      `Computer Usage: ${data.computerUsage}`,
      `Admin Time: ${data.adminTime}`,
      `Frustrations: ${data.frustrations}`,
    ];
    const text = lines.join('\n');
    const html = `<pre style="font:14px ui-monospace,monospace">${text}</pre>`;

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!, // must be a verified sender/domain in Resend
      to: process.env.EMAIL_TO!,
      subject,
      text,
      html,
    });
    if (error) throw new Error(error.message || 'Resend error');

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json(
      { ok: false, error: e?.issues?.[0]?.message ?? e?.message ?? 'Bad request' },
      { status: 400 }
    );
  }
}
