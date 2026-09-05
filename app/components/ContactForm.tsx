'use client';

import { useState } from 'react';
import { sendGAEvent } from '@next/third-parties/google';

const googleAnalyticsEnabled = process.env.NODE_ENV === 'production';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', message: '', website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const change = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (status === 'error') setStatus('idle');
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('/api/send-email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      if (!response.ok) throw new Error();
      if (googleAnalyticsEnabled) {
        sendGAEvent('event', 'generate_lead', {
          form_name: 'contact',
          service: formData.service,
        });
      }
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h2>Thanks. We’ll be in touch.</h2><p>Your message is on its way.</p></div>;
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-honeypot" aria-hidden="true">
        <label>Website<input name="website" value={formData.website} onChange={change} tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="field-row">
        <label>Name<input name="name" value={formData.name} onChange={change} autoComplete="name" required /></label>
        <label>Email<input type="email" name="email" value={formData.email} onChange={change} autoComplete="email" required /></label>
      </div>
      <label>Business<input name="company" value={formData.company} onChange={change} autoComplete="organization" /></label>
      <label>How can we help?
        <select name="service" value={formData.service} onChange={change} required>
          <option value="">Choose one</option>
          <option>AI Consulting</option>
          <option>AI Training &amp; Workshops</option>
        </select>
      </label>
      <label>What would you like to improve?<textarea name="message" value={formData.message} onChange={change} rows={5} required /></label>
      {status === 'error' && <p className="form-error" role="alert">Your message couldn’t be sent. Please wait a moment and try again.</p>}
      <button className="button button-primary" type="submit" disabled={status === 'sending'} aria-live="polite">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button>
      <p className="form-privacy">We’ll only use these details to respond to your enquiry. See our <a href="/privacy">privacy policy</a>.</p>
    </form>
  );
}
