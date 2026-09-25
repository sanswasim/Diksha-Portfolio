export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  const fullName = String(body.fullName || '').trim();
  const email = String(body.email || '').trim();
  const organization = String(body.organization || '').trim();
  const inquiryType = String(body.inquiryType || 'General Professional Discussion').trim();
  const message = String(body.message || '').trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (fullName.length < 2 || !emailOk || !organization || message.length < 10) {
    return res.status(400).json({ ok: false, error: 'Invalid form payload' });
  }

  const to = process.env.CONTACT_TO_EMAIL || 'dikshaagarwal798@gmail.com';
  const subject = `Portfolio inquiry · ${inquiryType} · ${fullName}`;
  const text = [
    `Name: ${fullName}`,
    `Email: ${email}`,
    `Organization: ${organization}`,
    `Inquiry: ${inquiryType}`,
    '',
    message,
  ].join('\n');

  if (process.env.RESEND_API_KEY) {
    const from = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(502).json({ ok: false, error: 'Resend delivery failed', detail });
    }

    return res.status(200).json({ ok: true, provider: 'resend' });
  }

  if (process.env.FORMSPREE_ID) {
    const response = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_ID}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName,
        email,
        organization,
        inquiryType,
        message,
        _subject: subject,
      }),
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, error: 'Formspree delivery failed' });
    }

    return res.status(200).json({ ok: true, provider: 'formspree' });
  }

  return res.status(503).json({
    ok: false,
    error: 'No server email provider configured',
    hint: 'Set RESEND_API_KEY or FORMSPREE_ID on Vercel',
  });
}
