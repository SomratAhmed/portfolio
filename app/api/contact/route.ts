import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 200, message: 5000 };

type Payload = { name?: unknown; email?: unknown; message?: unknown };

function clean(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = clean(payload.name, MAX.name);
  const email = clean(payload.email, MAX.email);
  const message = clean(payload.message, MAX.message);

  if (!name || !EMAIL.test(email) || !message) {
    return NextResponse.json(
      { error: "Name, a valid email address and a message are all required." },
      { status: 400 }
    );
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    // Missing configuration is an operator problem, not a visitor's — say so in
    // the log, and give the visitor the fallback the UI already offers.
    console.error("[contact] SMTP is not configured; see .env.example");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 }
    );
  }

  const port = Number(SMTP_PORT ?? 465);

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: `"Portfolio contact form" <${SMTP_USER}>`,
      to: CONTACT_TO ?? SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n—\n${name}\n${email}\n`,
    });
  } catch (error) {
    console.error("[contact] send failed:", error);
    return NextResponse.json(
      { error: "The message could not be delivered." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
