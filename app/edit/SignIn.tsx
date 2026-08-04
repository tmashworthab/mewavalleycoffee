"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/edit/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setConfigured(Boolean(d?.configured));
        if (d?.authenticated) router.replace("/");
      })
      .catch(() => setConfigured(false));
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/edit/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Sign in failed");
      // Full reload so every page picks up the editing session.
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
      setBusy(false);
    }
  }

  return (
    <main
      id="main"
      className="min-h-[100svh] flex items-center justify-center px-6 py-24"
    >
      <div className="w-full max-w-sm">
        <p className="type-eyebrow text-[#c9a468] mb-6">Site editor</p>
        <h1 className="font-serif-display type-subtitle text-[#f2ede6] mb-4">
          Sign in to edit
        </h1>
        <p className="font-serif-body text-[0.9375rem] text-[#f2ede6]/55 mb-10">
          Once you&rsquo;re in, click any text on the site to change it.
        </p>

        {configured === false ? (
          <p className="font-serif-body text-[0.9375rem] text-[#e6a08a]">
            The editor has not been set up on this deployment yet. An
            EDITOR_PASSWORD needs adding to the hosting environment.
          </p>
        ) : (
          <form onSubmit={submit}>
            <label
              htmlFor="editor-password"
              className="block type-eyebrow text-[#f2ede6]/55 mb-3"
            >
              Password
            </label>
            <input
              id="editor-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#c9a468]/25 px-0 py-3 font-serif-body text-[1.0625rem] text-[#f2ede6] focus:outline-none focus:border-[#c9a468] transition-colors duration-500"
            />

            {error && (
              <p role="alert" className="mt-6 text-[0.875rem] text-[#e6a08a]">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="mt-10 inline-flex items-center gap-4 text-[#f2ede6] hover:text-[#c9a468] disabled:opacity-40 transition-colors duration-500"
            >
              <span className="type-eyebrow">
                {busy ? "Checking…" : "Sign in"}
              </span>
              <span className="block w-12 h-px bg-current" />
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
