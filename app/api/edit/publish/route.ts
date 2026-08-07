import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, readSession } from "../../../lib/editor-session";
import { dictionary, paths, set, isLocale } from "../../../lib/content";
import {
  format as currentFormat,
  isAlignment,
  isSizeStep,
  isFont,
  isColour,
  type FieldFormat,
  type FormatMap,
} from "../../../lib/format";

export const dynamic = "force-dynamic";

const MAX_FIELD_LENGTH = 4000;

type Edits = Record<string, string>;

interface GitHubFile {
  path: string;
  body: string;
  message: string;
}

/** Commit one file, using its current SHA so a concurrent change cannot be lost. */
async function commitFile(
  file: GitHubFile,
  repo: string,
  branch: string,
  token: string
): Promise<{ ok: true; sha: string } | { ok: false; error: string }> {
  const api = `https://api.github.com/repos/${repo}/contents/${file.path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  const currentRes = await fetch(`${api}?ref=${branch}`, {
    headers,
    cache: "no-store",
  });
  if (!currentRes.ok) {
    return {
      ok: false,
      error: `Could not read ${file.path} from GitHub (${currentRes.status}).`,
    };
  }
  const current = await currentRes.json();

  const putRes = await fetch(api, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: file.message,
      content: Buffer.from(file.body, "utf8").toString("base64"),
      sha: current.sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const detail = await putRes.text();
    console.error("GitHub publish failed:", putRes.status, detail.slice(0, 300));
    return { ok: false, error: `GitHub rejected the change (${putRes.status}).` };
  }

  const result = await putRes.json();
  return { ok: true, sha: result?.commit?.sha?.slice(0, 7) ?? "" };
}

export async function POST(request: NextRequest) {
  const store = await cookies();
  const session = await readSession(store.get(SESSION_COOKIE)?.value);
  if (!session) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let edits: Edits;
  let formatEdits: Record<string, unknown>;
  let locale: string;
  try {
    const body = await request.json();
    edits = body?.edits ?? {};
    formatEdits = body?.format ?? {};
    locale = typeof body?.locale === "string" ? body.locale : "en";
    if (typeof edits !== "object" || edits === null) throw new Error();
    if (typeof formatEdits !== "object" || formatEdits === null) throw new Error();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  if (!isLocale(locale)) {
    return NextResponse.json({ error: "Unknown language" }, { status: 400 });
  }

  const allowed = new Set(paths());
  const rejected: string[] = [];

  // --- Copy ---
  let nextContent = dictionary(locale);
  for (const [key, value] of Object.entries(edits)) {
    if (
      !allowed.has(key) ||
      typeof value !== "string" ||
      value.length > MAX_FIELD_LENGTH
    ) {
      rejected.push(key);
      continue;
    }
    nextContent = set(nextContent, key, value);
  }

  // --- Formatting ---
  // Only the closed set of alignment and size values is accepted, so nothing
  // arbitrary can reach a style attribute.
  const nextFormat: FormatMap = structuredClone(currentFormat);
  for (const [key, value] of Object.entries(formatEdits)) {
    if (!allowed.has(key) || typeof value !== "object" || value === null) {
      rejected.push(key);
      continue;
    }
    const { align, size, font, colour, bold, italic, underline } =
      value as Record<string, unknown>;

    // Each property is checked against its closed set, so nothing arbitrary
    // can reach a class name or a style attribute.
    const isBool = (v: unknown) => v === undefined || typeof v === "boolean";
    if (
      (align !== undefined && !isAlignment(align)) ||
      (size !== undefined && !isSizeStep(size)) ||
      (font !== undefined && !isFont(font)) ||
      (colour !== undefined && !isColour(colour)) ||
      !isBool(bold) ||
      !isBool(italic) ||
      !isBool(underline)
    ) {
      rejected.push(key);
      continue;
    }

    const entry: FieldFormat = {};
    if (isAlignment(align)) entry.align = align;
    if (isSizeStep(size)) entry.size = size;
    if (isFont(font)) entry.font = font;
    if (isColour(colour)) entry.colour = colour;
    if (bold === true) entry.bold = true;
    if (italic === true) entry.italic = true;
    if (underline === true) entry.underline = true;

    if (Object.keys(entry).length === 0) delete nextFormat[key];
    else nextFormat[key] = entry;
  }

  if (rejected.length) {
    return NextResponse.json(
      { error: `Unrecognised fields: ${rejected.slice(0, 5).join(", ")}` },
      { status: 400 }
    );
  }

  const changed = Object.keys(edits).length + Object.keys(formatEdits).length;
  if (changed === 0) {
    return NextResponse.json({ error: "No changes to publish" }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !repo) {
    return NextResponse.json(
      {
        error:
          "Publishing is not configured. GITHUB_TOKEN and GITHUB_REPO must be set.",
      },
      { status: 503 }
    );
  }

  const by = `Published from the on-site editor by ${session.username}.`;
  const commits: string[] = [];

  if (Object.keys(edits).length) {
    const n = Object.keys(edits).length;
    const result = await commitFile(
      {
        path: `content/${locale}.json`,
        body: JSON.stringify(nextContent, null, 2) + "\n",
        message:
          (n === 1
            ? `Edit ${locale} copy: ${Object.keys(edits)[0]}`
            : `Edit ${locale} copy (${n} fields)`) + `\n\n${by}`,
      },
      repo,
      branch,
      token
    );
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 });
    commits.push(result.sha);
  }

  if (Object.keys(formatEdits).length) {
    const n = Object.keys(formatEdits).length;
    const result = await commitFile(
      {
        path: "content/format.json",
        body: JSON.stringify(nextFormat, null, 2) + "\n",
        message: `Edit text formatting (${n} field${n === 1 ? "" : "s"})\n\n${by}`,
      },
      repo,
      branch,
      token
    );
    if (!result.ok) return NextResponse.json({ error: result.error }, { status: 502 });
    commits.push(result.sha);
  }

  return NextResponse.json({ ok: true, changed, locale, commits });
}
