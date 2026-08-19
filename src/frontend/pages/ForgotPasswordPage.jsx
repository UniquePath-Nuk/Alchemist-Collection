import { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../backend/lib/firebaseClient";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  async function handleReset(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (authError) {
      console.error("Password reset error:", authError);
      setError(authError.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h1 className="mb-1 text-center font-display text-2xl font-bold text-text">Reset Password</h1>
        <p className="mb-6 text-center text-sm text-text-faint">
          Enter your email and we'll send you a reset link.
        </p>

        {sent ? (
          <div className="space-y-4 text-center">
            <p className="text-sm text-up">
              A password reset link has been sent to <strong>{email}</strong>. Check your inbox.
            </p>
            <Link to="/login" className="inline-block text-sm font-medium text-accent hover:underline">
              ← Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
            <div>
              <label className="mb-1 block text-sm font-medium text-text-dim">Email Address</label>
              <input
                type="email"
                value={email}
                disabled={loading}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
              />
            </div>

            {error && <p className="text-center text-sm text-down">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-accent py-2.5 text-sm font-semibold text-bg transition-colors hover:bg-accent/90 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <p className="text-center text-sm text-text-faint">
              <Link to="/login" className="font-medium text-accent hover:underline">
                ← Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
