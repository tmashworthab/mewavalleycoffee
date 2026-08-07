"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../../lib/locale-context";
import { LOCALE_SHORT } from "../../lib/content";

const DRAFT_PREFIX = "mvc-draft-edits";

type Edits = Record<string, string>;

/* Some strings are rendered with decoration around them (the pull quote sits
   inside curly quotes), so text is unwrapped on read and re-wrapped on write. */

function applyText(node: HTMLElement, value: string) {
  node.textContent =
    node.dataset.ckWrap === "quotes" ? `“${value}”` : value;
}

function bare(node: HTMLElement, raw: string): string {
  if (node.dataset.ckWrap !== "quotes") return raw;
  return raw.replace(/^[“"]/, "").replace(/[”"]$/, "");
}

function draftKey(locale: string) {
  return `${DRAFT_PREFIX}:${locale}`;
}

function readDrafts(locale: string): Edits {
  try {
    const parsed = JSON.parse(localStorage.getItem(draftKey(locale)) ?? "{}");
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export default function EditorOverlay({
  onExit,
  username,
}: {
  onExit: () => void;
  username: string | null;
}) {
  const locale = useLocale();
  // Drafts are read once, synchronously — this component never server-renders.
  const [edits, setEdits] = useState<Edits>(() => readDrafts(locale));
  const [active, setActive] = useState<string | null>(null);
  const [status, setStatus] = useState<{
    kind: "idle" | "working" | "ok" | "error";
    message?: string;
  }>({ kind: "idle" });

  // Original text, captured before any editing, so Discard can restore it.
  const originals = useRef<Map<string, string>>(new Map());

  /* ---------- Make the page editable ---------- */

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-ck]")
    );
    const drafts = readDrafts(locale);

    for (const node of nodes) {
      const key = node.dataset.ck!;
      if (!originals.current.has(key)) {
        originals.current.set(key, node.textContent ?? "");
      }
      // Re-apply any draft text left from a previous session on this device.
      if (drafts[key] !== undefined) {
        applyText(node, drafts[key]);
        node.dataset.dirty = "true";
      }
      node.setAttribute("contenteditable", "plaintext-only");
      node.setAttribute("spellcheck", "true");
      node.dataset.editable = "true";
    }

    document.documentElement.dataset.editing = "true";

    return () => {
      for (const node of nodes) {
        node.removeAttribute("contenteditable");
        node.removeAttribute("spellcheck");
        delete node.dataset.editable;
        delete node.dataset.dirty;
      }
      delete document.documentElement.dataset.editing;
    };
  }, [locale]);

  /* ---------- Track edits ---------- */

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      if (el instanceof HTMLElement) setActive(el.dataset.ck ?? null);
    };

    const onInput = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      if (!(el instanceof HTMLElement)) return;

      const key = el.dataset.ck!;
      const value = bare(el, el.textContent ?? "");
      const original = bare(el, originals.current.get(key) ?? "");

      setEdits((prev) => {
        const next = { ...prev };
        if (value === original) {
          delete next[key];
          delete el.dataset.dirty;
        } else {
          next[key] = value;
          el.dataset.dirty = "true";
        }
        localStorage.setItem(draftKey(locale), JSON.stringify(next));
        return next;
      });
    };

    // Enter commits rather than inserting a newline; Escape steps out.
    const onKeyDown = (e: KeyboardEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      if (!(el instanceof HTMLElement)) return;
      if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
        e.preventDefault();
        el.blur();
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("input", onInput);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [locale]);

  /* ---------- Actions ---------- */

  const discardAll = useCallback(() => {
    if (!confirm("Discard all unpublished edits and restore the live text?"))
      return;
    for (const [key, original] of originals.current) {
      const node = document.querySelector<HTMLElement>(
        `[data-ck="${CSS.escape(key)}"]`
      );
      if (node) {
        node.textContent = original;
        delete node.dataset.dirty;
      }
    }
    setEdits({});
    localStorage.removeItem(draftKey(locale));
    setStatus({ kind: "idle" });
  }, [locale]);

  const publish = useCallback(async () => {
    const count = Object.keys(edits).length;
    if (!count) return;
    setStatus({ kind: "working" });
    try {
      const res = await fetch("/api/edit/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Publish failed");

      // Published text is now the baseline, so nothing reads as unsaved.
      for (const key of Object.keys(edits)) {
        const node = document.querySelector<HTMLElement>(
          `[data-ck="${CSS.escape(key)}"]`
        );
        if (node) {
          originals.current.set(key, node.textContent ?? "");
          delete node.dataset.dirty;
        }
      }
      localStorage.removeItem(draftKey(locale));
      setEdits({});
      setStatus({
        kind: "ok",
        message: `Published ${count} change${count === 1 ? "" : "s"}. The site rebuilds in about 30 seconds.`,
      });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Publish failed",
      });
    }
  }, [edits, locale]);

  const signOut = useCallback(async () => {
    await fetch("/api/edit/session", { method: "DELETE" });
    onExit();
  }, [onExit]);

  const count = Object.keys(edits).length;

  const message =
    status.kind === "working"
      ? "Publishing…"
      : status.kind === "ok" || status.kind === "error"
        ? status.message
        : count === 0
          ? "Click any text to change it."
          : `${count} unpublished change${count === 1 ? "" : "s"}`;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[200] pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-3xl m-3 sm:m-5 rounded-xl border border-[#c9a468]/30 bg-[#141210]/97 backdrop-blur-xl shadow-2xl">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 px-4 sm:px-5 py-3.5">
          <span className="type-eyebrow text-[#c9a468] shrink-0">
            Editing {LOCALE_SHORT[locale]}
          </span>

          <span
            className={`text-[13px] flex-1 min-w-[9rem] ${
              status.kind === "error" ? "text-[#e6a08a]" : "text-[#f2ede6]/60"
            }`}
            role={status.kind === "error" ? "alert" : undefined}
          >
            {message}
          </span>

          <div className="flex items-center gap-2 ml-auto">
            {count > 0 && status.kind !== "working" && (
              <button
                onClick={discardAll}
                className="px-3 py-2 text-[12px] tracking-wide text-[#f2ede6]/60 hover:text-[#f2ede6] transition-colors"
              >
                Discard
              </button>
            )}
            <button
              onClick={publish}
              disabled={count === 0 || status.kind === "working"}
              className="px-4 py-2 rounded-md bg-[#c9a468] text-[#141210] text-[12px] font-medium tracking-wide disabled:opacity-35 disabled:cursor-not-allowed hover:bg-[#dcbb84] transition-colors"
            >
              {status.kind === "working" ? "Publishing…" : "Publish"}
            </button>
            <button
              onClick={signOut}
              title={username ? `Signed in as ${username}` : undefined}
              className="px-3 py-2 text-[12px] tracking-wide text-[#f2ede6]/50 hover:text-[#f2ede6] transition-colors"
            >
              Exit{username ? ` (${username})` : ""}
            </button>
          </div>
        </div>

        {status.kind === "error" && (
          <p className="px-5 pb-3 text-[12px] text-[#f2ede6]/45">
            Nothing was published. Your edits are still here.
          </p>
        )}

        {active && (
          <p className="px-5 pb-3 text-[11px] text-[#f2ede6]/30 font-mono truncate">
            {active}
          </p>
        )}
      </div>
    </div>
  );
}
