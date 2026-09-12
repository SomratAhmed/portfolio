import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX = { name: 120, email: 200, message: 5000 };

/**
 * Resend's shared sender. It may only deliver to the address that owns the
 * Resend account, which is exactly what this form does. Set RESEND_FROM to an
 * address on a verified domain to send from Somrat's own domain instead.
 */
const DEFAULT_FROM = "Portfolio contact form <onboarding@resend.dev>";

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

  const { RESEND_API_KEY, RESEND_FROM, CONTACT_TO } = process.env;

  if (!RESEND_API_KEY || !CONTACT_TO) {
    // Missing configuration is an operator problem, not a visitor's — log it,
    // and give the visitor the fallback the form already offers.
    console.error("[contact] RESEND_API_KEY or CONTACT_TO is unset; see .env.example");
    return NextResponse.json(
      { error: "The contact form is not configured yet." },
      { status: 503 }
    );
  }

  const resend = new Resend(RESEND_API_KEY);

  // Resend reports delivery failures in the response rather than by throwing,
  // so both paths have to be handled.
  try {
    const { error } = await resend.emails.send({
      from: RESEND_FROM || DEFAULT_FROM,
      to: [CONTACT_TO],
      replyTo: `${name} <${email}>`,
      subject: `Portfolio message from ${name}`,
      text: `${message}\n\n—\n${name}\n${email}\n`,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { error: "The message could not be delivered." },
        { status: 502 }
      );
    }
  } catch (thrown) {
    console.error("[contact] send failed:", thrown);
    return NextResponse.json(
      { error: "The message could not be delivered." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
