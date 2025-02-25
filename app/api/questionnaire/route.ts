import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, phone, currentAI, computerUsage, adminTime, frustrations, otherFrustrations } = data;

    // Store in Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert([{
        name,
        email,
        phone,
        current_ai: currentAI,
        computer_usage: computerUsage,
        admin_time: adminTime,
        frustrations: frustrations === 'Other' ? `Other: ${otherFrustrations}` : frustrations
      }]);

    if (dbError) throw dbError;

    // Send email notification
    const emailContent = {
      to: process.env.TO_EMAIL,
      from: process.env.FROM_EMAIL || 'noreply@kalgoorlie.ai',
      subject: 'New Lead from AI Readiness Assessment',
      text: `
New Lead Details:

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}

Assessment Results:
Current AI Usage: ${currentAI}
Computer Usage: ${computerUsage}
Admin Time: ${adminTime}
Main Frustration: ${frustrations === 'Other' ? otherFrustrations : frustrations}
      `,
      html: `
<h2>New Lead from AI Readiness Assessment</h2>

<h3>Contact Information:</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>

<h3>Assessment Results:</h3>
<p><strong>Current AI Usage:</strong> ${currentAI}</p>
<p><strong>Computer Usage:</strong> ${computerUsage}</p>
<p><strong>Admin Time:</strong> ${adminTime}</p>
<p><strong>Main Frustration:</strong> ${frustrations === 'Other' ? otherFrustrations : frustrations}</p>
      `
    };

    await sgMail.send(emailContent);

    return NextResponse.json(
      { message: 'Lead saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Lead Submission Error:', error);
    return NextResponse.json(
      { error: 'Failed to save lead' },
      { status: 500 }
    );
  }
}