export interface ContactFormPayload {
  fullName: string;
  email: string;
  organization: string;
  inquiryType: string;
  message: string;
  recipientEmail: string;
}

export interface ContactSubmitResult {
  ok: boolean;
  provider?: string;
  error?: string;
  reference: string;
  mailtoOpened?: boolean;
}

const makeReference = () =>
  `DLT-${Math.floor(100000 + Math.random() * 900000)}`;

async function postJson(url: string, body: Record<string, unknown>) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response;
}

function openMailtoFallback(payload: ContactFormPayload, reference: string) {
  const subject = encodeURIComponent(
    `Portfolio inquiry · ${payload.inquiryType} · ${payload.fullName}`
  );
  const body = encodeURIComponent(
    [
      `Reference: ${reference}`,
      `Name: ${payload.fullName}`,
      `Email: ${payload.email}`,
      `Organization: ${payload.organization}`,
      `Inquiry: ${payload.inquiryType}`,
      '',
      payload.message,
    ].join('\n')
  );
  window.location.href = `mailto:${payload.recipientEmail}?subject=${subject}&body=${body}`;
}

/**
 * Multi-provider contact dispatch:
 * 1) Vercel `/api/contact` (Resend, Formspree, or FormSubmit server-side)
 * 2) Client Formspree (`VITE_FORMSPREE_ID`)
 * 3) Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY`)
 * 4) FormSubmit.co AJAX to recipient email
 * 5) mailto: compose window as last-resort delivery path
 */
export async function submitContactInquiry(
  payload: ContactFormPayload
): Promise<ContactSubmitResult> {
  const reference = makeReference();
  const subject = `Portfolio inquiry · ${payload.inquiryType} · ${payload.fullName}`;
  const common = {
    fullName: payload.fullName,
    email: payload.email,
    organization: payload.organization,
    inquiryType: payload.inquiryType,
    message: payload.message,
    reference,
    _subject: subject,
  };

  // 1) Serverless API
  try {
    const apiRes = await postJson('/api/contact', common);
    if (apiRes.ok) {
      const data = (await apiRes.json().catch(() => ({}))) as { provider?: string };
      return { ok: true, provider: data.provider || 'api', reference };
    }
  } catch {
    // continue
  }

  // 2) Direct Formspree
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
  if (formspreeId) {
    try {
      const res = await postJson(`https://formspree.io/f/${formspreeId}`, common);
      if (res.ok) {
        return { ok: true, provider: 'formspree', reference };
      }
    } catch {
      // continue
    }
  }

  // 3) Web3Forms
  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (web3Key) {
    try {
      const res = await postJson('https://api.web3forms.com/submit', {
        access_key: web3Key,
        subject,
        from_name: payload.fullName,
        email: payload.email,
        organization: payload.organization,
        inquiryType: payload.inquiryType,
        message: payload.message,
        reference,
      });
      if (res.ok) {
        return { ok: true, provider: 'web3forms', reference };
      }
    } catch {
      // continue
    }
  }

  // 4) FormSubmit AJAX
  try {
    const res = await postJson(
      `https://formsubmit.co/ajax/${encodeURIComponent(payload.recipientEmail)}`,
      {
        name: payload.fullName,
        email: payload.email,
        organization: payload.organization,
        inquiryType: payload.inquiryType,
        message: payload.message,
        reference,
        _subject: subject,
        _template: 'table',
        _captcha: 'false',
      }
    );
    if (res.ok) {
      return { ok: true, provider: 'formsubmit', reference };
    }
  } catch {
    // fall through
  }

  // 5) mailto fallback — always gives the visitor a working path
  openMailtoFallback(payload, reference);
  return {
    ok: true,
    provider: 'mailto',
    reference,
    mailtoOpened: true,
  };
}
