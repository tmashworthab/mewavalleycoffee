import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  HINT_COOKIE,
  checkCredentials,
  createToken,
  readSession,
  cookieOptions,
  hintCookieOptions,
  editorConfigured,
  missingConfig,
  usingLegacyAccount,
  accountCount,
} from "../../../lib/editor-session";

export const dynamic = "force-dynamic";

/** Is the current visitor signed in to the editor? */
export async function GET() {
  const store = await cookies();
  const session = await readSession(store.get(SESSION_COOKIE)?.value);
  return NextResponse.json(
    {
      authenticated: Boolean(session),
      username: session?.username ?? null,
      configured: editorConfigured(),
      missing: missingConfig(),
      accounts: accountCount(),
      legacyAccount: usingLegacyAccount(),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

/** Sign in. */
export async function POST(request: NextRequest) {
  if (!editorConfigured()) {
    return NextResponse.json(
      { error: "The editor is not configured on this deployment." },
      { status: 503 }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await request.json();
    username = typeof body?.username === "string" ? body.username : "";
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Blunt brute-force dampener: a failed attempt always costs ~400ms.
  await new Promise((r) => setTimeout(r, 400));

  const resolved = await checkCredentials(username, password);
  if (!resolved) {
    // Deliberately vague — never reveal which half was wrong.
    return NextResponse.json(
      { error: "Incorrect username or password" },
      { status: 401 }
    );
  }

  const token = await createToken(resolved);
  if (!token) {
    return NextResponse.json({ error: "Editor misconfigured" }, { status: 503 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions);
  store.set(HINT_COOKIE, "1", hintCookieOptions);
  return NextResponse.json({ ok: true, username: resolved });
}

/** Sign out. */
export async function DELETE() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  store.set(HINT_COOKIE, "", { ...hintCookieOptions, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
