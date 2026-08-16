import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Get In Touch</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-sm text-text-dim">
        Questions about a listing, financing, or becoming a dealer partner? Send us a message.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-xl border border-border bg-surface p-6 text-sm text-up">
          Thanks — your message has been noted. Our team will get back to you shortly.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-border bg-surface p-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Name</label>
            <input
              type="text"
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Message</label>
            <textarea
              required
              rows={4}
              placeholder="How can we help?"
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <button type="submit" className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90">
            Send Message
          </button>
        </form>
      )}
    </div>
  );
}
