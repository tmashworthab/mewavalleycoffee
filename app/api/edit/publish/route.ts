import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifyToken } from "../../../lib/editor-session";
import { content, paths, set } from "../../../lib/content";

export const dynamic = "force-dynamic";

const CONTENT_PATH = "content/en.json";
const MAX_FIELD_LENGTH = 4000;

type Edits = Record<string, string>;

export async function POST(request: NextRequest) {
  const store = await cookies();
  if (!(await verifyToken(store.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  let edits: Edits;
  try {
    const body = await request.json();
    edits = body?.edits ?? {};
    if (typeof edits !== "object" || edits === null) throw new Error();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Only allow writes to keys that already exist, with sane values. This stops
  // a signed-in session from injecting new structure into the content file.
  const allowed = new Set(paths());
  const rejected: string[] = [];
  let next = content;

  for (const [key, value] of Object.entries(edits)) {
    if (!allowed.has(key) || typeof value !== "string") {
      rejected.push(key);
      continue;
    }
    if (value.length > MAX_FIELD_LENGTH) {
      rejected.push(key);
      continue;
    }
    next = set(next, key, value);
  }

  if (rejected.length) {
    return NextResponse.json(
      { error: `Unrecognised fields: ${rejected.slice(0, 5).join(", ")}` },
      { status: 400 }
    );
  }

  const changed = Object.keys(edits).length;
  if (changed === 0) {
    return NextResponse.json({ error: "No changes to publish" }, { status: 400 });
  }

  // Config is checked only once the payload is known good, so a malformed or
  // hostile request is rejected on its merits rather than masked by setup.
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

  const api = `https://api.github.com/repos/${repo}/contents/${CONTENT_PATH}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
  };

  // The current blob SHA is required for an update, and doubles as a guard
  // against clobbering a change made from another device.
  const currentRes = await fetch(`${api}?ref=${branch}`, {
    headers,
    cache: "no-store",
  });

  if (!currentRes.ok) {
    return NextResponse.json(
      { error: `Could not read ${CONTENT_PATH} from GitHub (${currentRes.status}).` },
      { status: 502 }
    );
  }

  const current = await currentRes.json();

  const body = JSON.stringify(next, null, 2) + "\n";
  const encoded = Buffer.from(body, "utf8").toString("base64");

  const summary =
    changed === 1
      ? `Edit site copy: ${Object.keys(edits)[0]}`
      : `Edit site copy (${changed} fields)`;

  const putRes = await fetch(api, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      message: `${summary}\n\nPublished from the on-site editor.`,
      content: encoded,
      sha: current.sha,
      branch,
    }),
  });

  if (!putRes.ok) {
    const detail = await putRes.text();
    console.error("GitHub publish failed:", putRes.status, detail.slice(0, 300));
    return NextResponse.json(
      { error: `GitHub rejected the change (${putRes.status}).` },
      { status: 502 }
    );
  }

  const result = await putRes.json();
  return NextResponse.json({
    ok: true,
    changed,
    commit: result?.commit?.sha?.slice(0, 7) ?? null,
  });
}
