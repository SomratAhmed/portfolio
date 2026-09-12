"use client";

import { useState } from "react";

type Errors = Partial<Record<"name" | "email" | "message", string>>;
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "failed"; reason: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function ContactForm({ to }: { to: string }) {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const set = (field: keyof typeof values) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((v) => ({ ...v, [field]: event.target.value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  function validate(): Errors {
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Add your name so Somrat knows who wrote.";
    if (!EMAIL.test(values.email.trim()))
      next.email = "Add an email address he can reply to.";
    if (!values.message.trim())
      next.message = "Write a line or two about why you are getting in touch.";
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "idle" });
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus({
          kind: "failed",
          reason: body?.error ?? "The message could not be sent.",
        });
        return;
      }

      setValues({ name: "", email: "", message: "" });
      setStatus({ kind: "sent" });
    } catch {
      setStatus({
        kind: "failed",
        reason: "The message could not be sent — check your connection.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form className="msg" onSubmit={onSubmit} noValidate>
      <div className="msg-row">
        <div className={`fset${errors.name ? " bad" : ""}`}>
          <label htmlFor="mName">Your name</label>
          <input
            id="mName"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            value={values.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <span className="err">{errors.name}</span>}
        </div>

        <div className={`fset${errors.email ? " bad" : ""}`}>
          <label htmlFor="mEmail">Your email</label>
          <input
            id="mEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <span className="err">{errors.email}</span>}
        </div>
      </div>

      <div className={`fset${errors.message ? " bad" : ""}`}>
        <label htmlFor="mMsg">Message</label>
        <textarea
          id="mMsg"
          name="message"
          rows={6}
          placeholder="What you are working on, and what you would like to talk about."
          value={values.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>

      <div className="msg-foot">
        <button className="btn btn-solid" type="submit" disabled={sending}>
          {sending ? "Sending…" : "Send message"}
        </button>

        <p
          className={
            "msg-note" +
            (status.kind === "sent" ? " ok" : status.kind === "failed" ? " fail" : "")
          }
          role="status"
        >
          {status.kind === "sent" &&
            "Sent. Somrat has your message and will reply to the address you gave."}
          {status.kind === "failed" && (
            <>
              {status.reason} Write to <a href={`mailto:${to}`}>{to}</a> instead.
            </>
          )}
        </p>
      </div>
    </form>
  );
}
