# Somrat — portfolio

Next.js 16 (App Router, TypeScript) portfolio for Fazla Rabbi Somrat.
All CV content lives in `content/cv.ts`; the page is built from it.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Make the contact form deliver email

The form posts to `app/api/contact/route.ts`, which delivers the message with
[Resend](https://resend.com). Until it is configured the API answers `503` and
the form tells the visitor to email Somrat directly — nothing crashes, but
nothing is delivered either.

### 1. Get a Resend API key

1. Sign up at https://resend.com using `somrat.info.ict@gmail.com`
2. **API Keys → Create API Key** — sending access is enough
3. Copy it (it starts with `re_`); it is shown once

No domain is needed. Resend's shared `onboarding@resend.dev` sender may only
deliver to the address that owns the Resend account, which is exactly what
this form does: visitors' messages go to Somrat's own inbox, with `Reply-To`
set to the visitor so replying reaches them.

### 2. Write the local env file

```bash
cp .env.example .env.local
```

Paste the key into `RESEND_API_KEY`. `.env.local` is gitignored — never
commit it.

### 3. Test

```bash
npm run dev
```

Send yourself a message from the form. It should arrive at `CONTACT_TO`
within seconds; check spam the first time. Failures are printed in the
terminal running `npm run dev`, not in the browser.

### Sending from a custom domain (optional)

Once a domain is verified under **Domains** in Resend, set `RESEND_FROM` to an
address on it — e.g. `Portfolio <hello@fazlarabbisomrat.com>` — and mail will
come from that address instead of the shared sender.

## Deploy to Vercel

This app has a server route, so it needs a Node host. Vercel is free for
this and made by the Next.js team.

1. Push the folder to a GitHub repository
2. Go to https://vercel.com/new and import that repository
3. Before clicking Deploy, open **Environment Variables** and add
   `RESEND_API_KEY` and `CONTACT_TO`
   (environment variable changes need a redeploy to take effect)
4. Deploy — it goes live at `your-project.vercel.app`
5. Send one test message from the live site

Adding a custom domain: **Settings → Domains** in the Vercel dashboard.

> Netlify and GitHub Pages need extra work here. GitHub Pages serves static
> files only and cannot run `/api/contact` at all.

## Editing content

| What | Where |
| --- | --- |
| Any CV text, dates, skills, publication | `content/cv.ts` |
| Colours, type, spacing | `app/globals.css` (tokens at the top) |
| Page order and structure | `app/page.tsx` |
| Email delivery | `app/api/contact/route.ts` |
| The CV PDF and photo | `public/` |

Replacing the CV: drop the new PDF into `public/` and point
`profile.cvFile` in `content/cv.ts` at it.
