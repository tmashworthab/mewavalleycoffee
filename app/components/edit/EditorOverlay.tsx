"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "../../lib/locale-context";
import { LOCALE_SHORT } from "../../lib/content";
import {
  format as publishedFormat,
  STEP_REM,
  type Alignment,
  type Colour,
  type FontChoice,
  type SizeStep,
} from "../../lib/format";
import FormatBar from "./FormatBar";

const DRAFT_PREFIX = "mvc-draft-edits";
const FORMAT_DRAFT_KEY = "mvc-draft-format";

type Edits = Record<string, string>;
type FieldFormat = {
  align?: Alignment;
  size?: SizeStep;
  font?: FontChoice;
  colour?: Colour;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};
type FormatEdits = Record<string, FieldFormat>;

/* Some strings are rendered with decoration around them (the pull quote sits
   inside curly quotes), so text is unwrapped on read and re-wrapped on write. */

function applyText(node: HTMLElement, value: string) {
  node.textContent = node.dataset.ckWrap === "quotes" ? `“${value}”` : value;
}

function bare(node: HTMLElement, raw: string): string {
  if (node.dataset.ckWrap !== "quotes") return raw;
  return raw.replace(/^[“"]/, "").replace(/[”"]$/, "");
}

/** The field's source text, which differs from what is rendered for lists. */
function sourceOf(node: HTMLElement): string {
  return node.dataset.ckRaw ?? node.textContent ?? "";
}

/**
 * Read what the author actually typed.
 *
 * contenteditable represents some line breaks as `\n` text and others as
 * <br> elements, and textContent silently drops the latter — so paragraph
 * breaks would survive or vanish depending on where they were typed.
 * innerText is layout-aware and reports both as newlines.
 */
function typedText(node: HTMLElement): string {
  return node.innerText ?? node.textContent ?? "";
}

function draftKey(locale: string) {
  return `${DRAFT_PREFIX}:${locale}`;
}

function readJSON<T extends object>(key: string, fallback: T): T {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) ?? "null");
    return parsed && typeof parsed === "object" ? parsed : fallback;
  } catch {
    return fallback;
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
  const [edits, setEdits] = useState<Edits>(() =>
    readJSON<Edits>(draftKey(locale), {})
  );
  // Formatting is shared across languages, so its drafts are not namespaced.
  const [formatEdits, setFormatEdits] = useState<FormatEdits>(() =>
    readJSON<FormatEdits>(FORMAT_DRAFT_KEY, {})
  );
  const [active, setActive] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState<{
    kind: "idle" | "working" | "ok" | "error";
    message?: string;
  }>({ kind: "idle" });

  // Original text, captured before any editing, so Discard can restore it.
  const originals = useRef<Map<string, string>>(new Map());

  /* ---------- Make the page editable ---------- */

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-ck]"));
    const drafts = readJSON<Edits>(draftKey(locale), {});

    for (const node of nodes) {
      const key = node.dataset.ck!;
      if (!originals.current.has(key)) {
        originals.current.set(key, sourceOf(node));
      }
      // Show the source while editing, so list syntax is visible and editable
      // rather than hidden behind the rendered list.
      const draft = drafts[key];
      if (draft !== undefined) {
        applyText(node, draft);
        node.dataset.dirty = "true";
      } else if (node.dataset.ckRaw) {
        node.textContent = node.dataset.ckRaw;
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

  /* ---------- Live preview of formatting changes ---------- */

  useEffect(() => {
    const ALIGN = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    } as const;
    const FONTS = ["serif", "sans", "display", "classic", "modern"] as const;
    const COLOURS = ["cream", "muted", "gold", "goldLight", "white"] as const;

    for (const [key, f] of Object.entries(formatEdits)) {
      const node = document.querySelector<HTMLElement>(
        `[data-ck="${CSS.escape(key)}"]`
      );
      if (!node) continue;

      node.classList.remove("text-left", "text-center", "text-right");
      if (f.align) node.classList.add(ALIGN[f.align]);

      // Preview the step directly; the published version uses the .fs-N class.
      node.style.fontSize = f.size ? `${STEP_REM[f.size]}rem` : "";

      for (const name of FONTS) node.classList.remove(`ff-${name}`);
      if (f.font) node.classList.add(`ff-${f.font}`);

      for (const c of COLOURS) node.classList.remove(`tc-${c}`);
      if (f.colour) node.classList.add(`tc-${f.colour}`);

      node.classList.toggle("tx-bold", !!f.bold);
      node.classList.toggle("tx-italic", !!f.italic);
      node.classList.toggle("tx-underline", !!f.underline);
    }
  }, [formatEdits]);

  /* ---------- Track edits ---------- */

  useEffect(() => {
    const onFocusIn = (e: FocusEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      setActive(el instanceof HTMLElement ? el : null);
    };

    const onFocusOut = (e: FocusEvent) => {
      const next = e.relatedTarget as HTMLElement | null;
      // Ignore focus moving into the toolbar itself.
      if (next?.closest?.('[role="toolbar"]')) return;
      if (!next?.closest?.("[data-ck]")) setActive(null);
    };

    const onInput = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      if (!(el instanceof HTMLElement)) return;

      const key = el.dataset.ck!;
      const value = bare(el, typedText(el));
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

    const onKeyDown = (e: KeyboardEvent) => {
      const el = (e.target as HTMLElement)?.closest?.("[data-ck]");
      if (!(el instanceof HTMLElement)) return;
      if (e.key === "Escape") {
        e.preventDefault();
        el.blur();
        return;
      }
      // Body copy takes multiple lines, so Enter breaks the line there and
      // commits everywhere else.
      if (e.key === "Enter" && !e.shiftKey && el.dataset.ckMultiline !== "true") {
        e.preventDefault();
        el.blur();
      }
    };

    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    document.addEventListener("input", onInput);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("input", onInput);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [locale]);

  /* ---------- Formatting actions ---------- */

  /** Step a field's size relative to whatever it is now. */
  const stepFieldSize = useCallback(
    (key: string, delta: number, fallback: SizeStep) => {
      setFormatEdits((prev) => {
        const current: FieldFormat = {
          ...(prev[key] ?? publishedFormat[key] ?? {}),
        };
        const base = current.size ?? fallback;
        const nextStep = Math.min(12, Math.max(1, base + delta)) as SizeStep;
        if (nextStep === current.size) return prev;

        const next = { ...prev, [key]: { ...current, size: nextStep } };
        localStorage.setItem(FORMAT_DRAFT_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  /** Flip a boolean style flag on the focused field. */
  const toggleFieldFlag = useCallback(
    (key: string, flag: "bold" | "italic" | "underline") => {
      setFormatEdits((prev) => {
        const current: FieldFormat = {
          ...(prev[key] ?? publishedFormat[key] ?? {}),
        };
        if (current[flag]) delete current[flag];
        else current[flag] = true;

        const next = { ...prev };
        if (Object.keys(current).length === 0) delete next[key];
        else next[key] = current;
        localStorage.setItem(FORMAT_DRAFT_KEY, JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const setFieldFormat = useCallback((key: string, patch: FieldFormat) => {
    setFormatEdits((prev) => {
      const current: FieldFormat = {
        ...(prev[key] ?? publishedFormat[key] ?? {}),
      };
      for (const [k, v] of Object.entries(patch)) {
        // null means "back to the design default". Re-picking the active
        // option also clears it — but only for align and font, which are
        // pickers. Size is a stepper, so landing on the same number again
        // must be a no-op rather than a reset.
        const isToggle = k === "align" || k === "font" || k === "colour";
        if (v === null || (isToggle && current[k as keyof FieldFormat] === v)) {
          delete current[k as keyof FieldFormat];
        } else {
          Object.assign(current, { [k]: v });
        }
      }
      const next = { ...prev };
      if (Object.keys(current).length === 0) delete next[key];
      else next[key] = current;
      localStorage.setItem(FORMAT_DRAFT_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  /** Toggle list markers on every line of the focused field. */
  const applyList = useCallback(
    (kind: "bullet" | "number") => {
      const key = active?.dataset.ck;
      if (!key) return;
      // Re-query rather than mutating the node held in state.
      const el = document.querySelector<HTMLElement>(
        `[data-ck="${CSS.escape(key)}"]`
      );
      if (!el) return;
      const lines = typedText(el).split("\n");
      const anyMarker = /^\s*([-•*]|\d+[.)])\s+/;
      const bulletMarker = /^\s*[-•*]\s+/;
      const numberMarker = /^\s*\d+[.)]\s+/;

      const filled = lines.filter((l) => l.trim());
      const marker = kind === "bullet" ? bulletMarker : numberMarker;
      // Only clear when the list is already this kind; otherwise convert, so
      // bullets → numbers is one click rather than two.
      const alreadyThisKind =
        filled.length > 0 && filled.every((l) => marker.test(l));

      let n = 0;
      const value = lines
        .map((line) => {
          if (!line.trim()) return line;
          const stripped = line.replace(anyMarker, "");
          if (alreadyThisKind) return stripped;
          n += 1;
          return kind === "bullet" ? `- ${stripped}` : `${n}. ${stripped}`;
        })
        .join("\n");

      el.textContent = value;
      el.dataset.dirty = "true";

      setEdits((prev) => {
        const updated = { ...prev, [key]: value };
        localStorage.setItem(draftKey(locale), JSON.stringify(updated));
        return updated;
      });
    },
    [active, locale]
  );

  /* ---------- Publish / discard ---------- */

  const discardAll = useCallback(() => {
    if (!confirm("Discard all unpublished edits and restore the live text?")) return;
    for (const [key, original] of originals.current) {
      const node = document.querySelector<HTMLElement>(
        `[data-ck="${CSS.escape(key)}"]`
      );
      if (node) {
        node.textContent = original;
        delete node.dataset.dirty;
        node.classList.remove("text-left", "text-center", "text-right");
        for (const name of ["serif", "sans", "display", "classic", "modern"]) {
          node.classList.remove(`ff-${name}`);
        }
        for (const c of ["cream", "muted", "gold", "goldLight", "white"]) {
          node.classList.remove(`tc-${c}`);
        }
        node.classList.remove("tx-bold", "tx-italic", "tx-underline");
        node.style.fontSize = "";
      }
    }
    setEdits({});
    setFormatEdits({});
    localStorage.removeItem(draftKey(locale));
    localStorage.removeItem(FORMAT_DRAFT_KEY);
    setStatus({ kind: "idle" });
  }, [locale]);

  const textCount = Object.keys(edits).length;
  const formatCount = Object.keys(formatEdits).length;
  const count = textCount + formatCount;

  const publish = useCallback(async () => {
    if (!count) return;
    setStatus({ kind: "working" });
    try {
      const res = await fetch("/api/edit/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits, format: formatEdits, locale }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Publish failed");

      for (const key of Object.keys(edits)) {
        const node = document.querySelector<HTMLElement>(
          `[data-ck="${CSS.escape(key)}"]`
        );
        if (node) {
          originals.current.set(key, typedText(node));
          delete node.dataset.dirty;
        }
      }
      localStorage.removeItem(draftKey(locale));
      localStorage.removeItem(FORMAT_DRAFT_KEY);
      setEdits({});
      setFormatEdits({});
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
  }, [edits, formatEdits, count, locale]);

  const signOut = useCallback(async () => {
    await fetch("/api/edit/session", { method: "DELETE" });
    onExit();
  }, [onExit]);

  const activeKey = active?.dataset.ck ?? null;
  const activeFormat: FieldFormat = activeKey
    ? (formatEdits[activeKey] ?? publishedFormat[activeKey] ?? {})
    : {};

  const message =
    status.kind === "working"
      ? "Publishing…"
      : status.kind === "ok" || status.kind === "error"
        ? status.message
        : count === 0
          ? "Click any text to change it."
          : `${count} unpublished change${count === 1 ? "" : "s"}`;

  return (
    <>
      <FormatBar
        target={active}
        state={activeFormat}
        onAlign={(a) => activeKey && setFieldFormat(activeKey, { align: a })}
        onSizeStep={(delta, fallback) =>
          activeKey && stepFieldSize(activeKey, delta, fallback)
        }
        onFont={(f) =>
          activeKey &&
          setFieldFormat(activeKey, { font: f as FontChoice | undefined })
        }
        onColour={(c) =>
          activeKey &&
          setFieldFormat(activeKey, { colour: c as Colour | undefined })
        }
        onToggle={(k) => activeKey && toggleFieldFlag(activeKey, k)}
        onList={applyList}
      />

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

          {activeKey && (
            <p className="px-5 pb-3 text-[11px] text-[#f2ede6]/30 font-mono truncate">
              {activeKey}
              {active?.dataset.ckMultiline === "true" &&
                " · Enter for a new line · start a line with -  or 1."}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
