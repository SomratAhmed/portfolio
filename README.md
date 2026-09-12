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

The form posts to `app/api/contact/route.ts`, which sends the message over
SMTP. Until SMTP is configured the API answers `503` and the form tells the
visitor to email Somrat directly — nothing crashes, but nothing is delivered.

### 1. Create a Gmail App Password

A normal Gmail password will not work for SMTP.

1. Go to https://myaccount.google.com/security and turn on **2-Step Verification**
2. Go to https://myaccount.google.com/apppasswords
3. Name it `portfolio` and click **Create**
4. Copy the 16-character password (no spaces)

### 2. Write the local env file

```bash
cp .env.example .env.local
```

Then edit `.env.local` and paste the App Password into `SMTP_PASS`.
`.env.local` is gitignored — never commit it.

### 3. Test

```bash
npm run dev
```

Send yourself a message from the form. It should arrive at `CONTACT_TO`
within a few seconds; check spam the first time. Replying to that email
goes straight back to the visitor, because the API sets `Reply-To` to
their address.

If it fails, the reason is printed in the terminal running `npm run dev`,
not in the browser.

## Deploy to Vercel

This app has a server route, so it needs a Node host. Vercel is free for
this and made by the Next.js team.

1. Push the folder to a GitHub repository
2. Go to https://vercel.com/new and import that repository
3. Before clicking Deploy, open **Environment Variables** and add all five
   keys from `.env.local` (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`,
   `SMTP_PASS`, `CONTACT_TO`)
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
