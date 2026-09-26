# Contact form setup (Vercel)

The portfolio contact form tries providers in this order:

1. `POST /api/contact` on Vercel
2. Formspree (`VITE_FORMSPREE_ID`)
3. Web3Forms (`VITE_WEB3FORMS_ACCESS_KEY`)
4. FormSubmit.co AJAX to `CONTACT_TO_EMAIL`
5. Opens the visitor’s mail app (`mailto:`) as a guaranteed last resort

## Recommended production setup (5 minutes)

### Option A — Resend (best)

1. Create a free account at https://resend.com
2. Create an API key
3. In Vercel → Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` = your key
   - `CONTACT_TO_EMAIL` = `dikshaagarwal798@gmail.com`
   - `CONTACT_FROM_EMAIL` = `Portfolio <onboarding@resend.dev>` (or a verified domain sender)
4. Redeploy

### Option B — Formspree

1. Create a form at https://formspree.io
2. Copy the form id (e.g. `xyzabcde`)
3. Add either:
   - `FORMSPREE_ID` (server) **or**
   - `VITE_FORMSPREE_ID` (client)
4. Redeploy

### Option C — zero config

No env vars required. The first submission triggers a FormSubmit confirmation email to Diksha; after she confirms once, later inquiries arrive normally. If FormSubmit is blocked, visitors still get a pre-filled mailto draft.

## Also set for LinkedIn previews

```
VITE_APP_URL=https://dikshagarwal.site
```

## Deep-linked case studies

Featured cards and blueprint links use shareable URLs such as:

```
https://dikshagarwal.site/#/projects/proj-sn-km-architecture
https://dikshagarwal.site/#/projects/proj-saba-curriculum
https://dikshagarwal.site/#/projects/proj-pricing-transformation
```
