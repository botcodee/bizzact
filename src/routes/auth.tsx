import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign In — BizzAct" },
      {
        name: "description",
        content: "Sign in to the BizzAct admin console to review demo and contact requests.",
      },
      { property: "og:title", content: "Admin Sign In — BizzAct" },
      {
        property: "og:description",
        content: "Secure sign in for the BizzAct admin console.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return setError(error.message);
      navigate({ to: "/admin", replace: true });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: window.location.origin + "/auth" },
    });
    setBusy(false);
    if (error) return setError(error.message);
    if (!data.session) {
      setMessage("Check your email to confirm your account, then sign in.");
      return;
    }
    navigate({ to: "/admin", replace: true });
  }

  async function onGoogle() {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/auth",
    });
    if (result.error) return setError("Google sign-in failed. Please try again.");
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="grid min-h-screen place-items-center surface-cream px-6 py-16">
      <div className="w-full max-w-sm rounded-2xl bg-card p-7 clay clay-lg">
        <div
          className="grid size-11 place-items-center rounded-xl"
          style={{ background: "color-mix(in oklab, var(--brand-green) 14%, var(--card))" }}
        >
          <Lock className="size-5" style={{ color: "var(--brand-green)" }} />
        </div>
        <h1 className="mt-4 text-xl font-extrabold tracking-tight">Admin Sign In</h1>
        <p className="mt-1.5 text-xs text-muted-foreground">
          Sign in to review demo &amp; contact requests.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            autoComplete="email"
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          />
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            className="w-full rounded-xl border border-input bg-background px-3.5 py-2.5 text-sm outline-none focus:border-primary"
          />
          {error && <p className="text-xs font-medium text-destructive">{error}</p>}
          {message && (
            <p className="text-xs font-medium" style={{ color: "var(--brand-green)" }}>
              {message}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-clay w-full disabled:opacity-60">
            {busy && <Loader2 className="size-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-border" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            or
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        <button type="button" onClick={onGoogle} className="btn-ghost-clay w-full">
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signin" ? "signup" : "signin");
            setError(null);
            setMessage(null);
          }}
          className="mt-5 w-full text-center text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>

        <Link
          to="/"
          className="mt-3 block text-center text-xs text-muted-foreground transition-colors hover:text-primary"
        >
          Back to website
        </Link>
      </div>
    </div>
  );
}
