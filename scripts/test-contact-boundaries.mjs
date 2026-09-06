const baseUrl = process.env.CONTACT_TEST_BASE_URL || 'http://127.0.0.1:4173';
const endpoint = `${baseUrl}/api/send-email`;

const validPayload = {
  name: 'Boundary Test',
  email: 'boundary-test@example.com',
  company: 'Synthetic Test Co',
  service: 'AI Business Systems',
  message: 'This synthetic payload must never become a real enquiry.',
  website: '',
};

async function request(options = {}) {
  const response = await fetch(endpoint, options);
  const body = await response.text();
  return { status: response.status, body, headers: response.headers };
}

async function expectStatus(label, expectedStatus, options) {
  const result = await request(options);
  if (result.status !== expectedStatus) {
    throw new Error(`${label}: expected ${expectedStatus}, received ${result.status}: ${result.body}`);
  }
  console.log(`PASS ${label}: ${result.status}`);
  return result;
}

await expectStatus('GET is not accepted', 405, { method: 'GET' });
await expectStatus('non-JSON content type is rejected', 415, {
  method: 'POST',
  headers: { 'Content-Type': 'text/plain' },
  body: 'not json',
});
await expectStatus('malformed JSON is rejected', 400, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '{',
});
await expectStatus('missing required fields are rejected', 400, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Only a name' }),
});
await expectStatus('unknown service is rejected', 400, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...validPayload, service: 'Unknown service' }),
});
await expectStatus('unexpected fields are rejected', 400, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...validPayload, admin: true }),
});
await expectStatus('cross-origin submission is rejected', 403, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Origin: 'https://malicious.example',
  },
  body: JSON.stringify(validPayload),
});
await expectStatus('oversized body is rejected', 413, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...validPayload, message: 'x'.repeat(17_000) }),
});
await expectStatus('honeypot submission is silently accepted', 200, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ...validPayload, website: 'https://bot.example' }),
});

const unavailable = await expectStatus('valid submission stops before delivery when email is disabled', 503, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(validPayload),
});

if (!unavailable.body.includes('Email service unavailable')) {
  throw new Error(`Email-disabled check returned an unexpected body: ${unavailable.body}`);
}

console.log('All contact-form boundary tests passed without sending an enquiry.');
