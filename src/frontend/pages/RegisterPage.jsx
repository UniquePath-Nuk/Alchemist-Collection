import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../backend/lib/firebaseClient";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (authError) {
      console.error("Firebase registration error:", authError);
      setError(authError.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h1 className="mb-1 text-center font-display text-2xl font-bold text-text">Register</h1>
        <p className="mb-6 text-center text-sm text-text-faint">Create a dealer admin account</p>

        <form onSubmit={handleRegister} className="space-y-5">
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
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Password</label>
            <input
              type="password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              disabled={loading}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
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
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-faint">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-accent hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
