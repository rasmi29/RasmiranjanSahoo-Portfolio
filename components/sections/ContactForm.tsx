"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AUTHOR, WEB3FORMS_KEY } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const PROJECT_TYPES = [
  "Web application",
  "Mobile app (React Native)",
  "E-commerce / marketplace",
  "Gen-AI integration",
  "Something else",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Not sure yet",
];

const TIMELINES = ["ASAP", "Within a month", "1–3 months", "Just exploring"];

const field =
  "w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-emerald-500/60 focus:outline-none focus:ring-1 focus:ring-emerald-500/40 transition-colors";
const label =
  "block mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const formData = new FormData(e.currentTarget);

    // Honeypot — bots fill hidden fields, humans don't.
    if (formData.get("botcheck")) {
      setStatus("success");
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setError(
        "The form isn't connected yet. Please email me directly in the meantime.",
      );
      return;
    }

    formData.append("access_key", WEB3FORMS_KEY);
    formData.append("subject", `New project enquiry from ${formData.get("name")}`);
    formData.append("from_name", "rasmiranjan.in");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        e.currentTarget.reset();
      } else {
        setStatus("error");
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
        className="flex flex-col items-start gap-4 border border-emerald-500/30 bg-emerald-500/5 p-10"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white">Message sent.</h3>
        <p className="text-neutral-300">
          Thanks for reaching out — I read every enquiry and usually reply within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-mono uppercase tracking-widest text-emerald-400 underline underline-offset-4"
        >
          Send another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
      {/* Honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="cf-name">
            Name <span className="text-emerald-400">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={field}
          />
        </div>
        <div>
          <label className={label} htmlFor="cf-email">
            Email <span className="text-emerald-400">*</span>
          </label>
          <input
            id="cf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={field}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label className={label} htmlFor="cf-type">
            Project type
          </label>
          <select id="cf-type" name="project_type" className={field} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-neutral-900">
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="cf-budget">
            Budget
          </label>
          <select id="cf-budget" name="budget" className={field} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-neutral-900">
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="cf-timeline">
            Timeline
          </label>
          <select id="cf-timeline" name="timeline" className={field} defaultValue="">
            <option value="" disabled>
              Select…
            </option>
            {TIMELINES.map((t) => (
              <option key={t} value={t} className="bg-neutral-900">
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={label} htmlFor="cf-message">
          What are you building? <span className="text-emerald-400">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={5}
          placeholder="A sentence or two about the project, who it's for, and what success looks like."
          className={`${field} resize-y`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-300"
          >
            {error}{" "}
            <a href={`mailto:${AUTHOR.email}`} className="underline underline-offset-4">
              {AUTHOR.email}
            </a>
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-3 bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black transition-colors hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />
              Sending…
            </>
          ) : (
            <>
              Send enquiry
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </>
          )}
        </button>
        <p className="text-xs text-neutral-400">
          Or email me directly at{" "}
          <a
            href={`mailto:${AUTHOR.email}`}
            className="text-neutral-200 underline underline-offset-4 hover:text-emerald-400"
          >
            {AUTHOR.email}
          </a>
        </p>
      </div>
    </form>
  );
}
