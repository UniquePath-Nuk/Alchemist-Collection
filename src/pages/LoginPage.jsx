import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../lib/firebaseClient";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (authError) {
      console.error("Firebase login error:", authError);
      setError(authError.message.replace("Firebase: ", ""));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
        <h2 className="mb-1 text-center font-display text-2xl font-bold text-text">Dealer Login</h2>
        <p className="mb-6 text-center text-sm text-text-faint">Access the Alchemist admin dashboard</p>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="mb-1 block text-sm font-medium text-text-dim">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-border-light bg-surface-2 px-4 py-2.5 text-sm text-text placeholder-text-faint focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm font-medium text-text-dim">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-faint">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-accent hover:underline">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
