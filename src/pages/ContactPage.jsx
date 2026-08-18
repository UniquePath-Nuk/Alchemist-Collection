import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebaseClient";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleChange(e) {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await addDoc(collection(db, "messages"), {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        status: "new",
        createdAt: serverTimestamp(),
      });

      setForm({ name: "", email: "", message: "" });
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending contact message:", err);
      setError("We couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Get In Touch</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-text sm:text-4xl">Contact Us</h1>
      <p className="mt-3 text-sm text-text-dim">
        Questions about a listing, financing, or becoming a dealer partner? Send us a message.
      </p>

      {submitted ? (
        <div className="mt-8 rounded-xl border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-up">Message sent successfully.</p>
          <p className="mt-2 text-sm text-text-dim">Our team will review it from the admin dashboard and get back to you shortly.</p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 rounded-lg border border-border-light px-4 py-2 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-border bg-surface p-6">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-text-dim">Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} type="text" required placeholder="Your name" className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-dim">Email Address</label>
            <input id="email" name="email" value={form.email} onChange={handleChange} type="email" required placeholder="you@example.com" className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-dim">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="How can we help?" className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none" />
          </div>
          {error && <p className="text-sm text-down">{error}</p>}
          <button disabled={sending} type="submit" className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60">
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}
    </div>
  );
}