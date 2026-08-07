"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [missing, setMissing] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/edit/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setConfigured(Boolean(d?.configured));
        setMissing(Array.isArray(d?.missing) ? d.missing : []);
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
        body: JSON.stringify({ username, password }),
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
          <div>
            <p className="font-serif-body text-[0.9375rem] text-[#e6a08a] mb-5">
              This deployment cannot see its editor settings, so sign-in is
              switched off.
            </p>
            <p className="type-caption text-[#f2ede6]/55 mb-3">
              Not visible to the running app:
            </p>
            <ul className="list-none p-0 m-0 space-y-1.5">
              {missing.map((name) => (
                <li key={name} className="type-caption text-[#f2ede6]/70 font-mono">
                  {name}
                </li>
              ))}
            </ul>
            <p className="type-caption text-[#f2ede6]/45 mt-5 leading-relaxed">
              Add these in Railway under the site&rsquo;s service, then redeploy.
              Check the spelling exactly, and that they are on the same service
              and environment as the site itself.
            </p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label
              htmlFor="editor-username"
              className="block type-eyebrow text-[#f2ede6]/55 mb-3"
            >
              Username
            </label>
            <input
              id="editor-username"
              name="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect="off"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent border-0 border-b border-[#c9a468]/25 px-0 py-3 mb-10 font-serif-body text-[1.0625rem] text-[#f2ede6] focus:outline-none focus:border-[#c9a468] transition-colors duration-500"
            />

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
