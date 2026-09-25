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

/**
 * Multi-provider contact dispatch:
 * 1) Vercel `/api/contact` (Resend or Formspree server-side)
 * 2) Client Formspree (`VITE_FORMSPREE_ID`)
 * 3) FormSubmit.co AJAX to recipient email (zero-config fallback)
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
    // continue to next provider
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

  // 3) FormSubmit (works after one-time inbox confirmation)
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

  return {
    ok: false,
    reference,
    error: 'Unable to deliver inquiry. Please email directly or configure Formspree/Resend.',
  };
}
