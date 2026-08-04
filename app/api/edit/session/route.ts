import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  checkPassword,
  createToken,
  verifyToken,
  cookieOptions,
  hintCookieOptions,
  HINT_COOKIE,
  editorConfigured,
} from "../../../lib/editor-session";

export const dynamic = "force-dynamic";

/** Is the current visitor signed in to the editor? */
export async function GET() {
  const store = await cookies();
  const ok = await verifyToken(store.get(SESSION_COOKIE)?.value);
  return NextResponse.json(
    { authenticated: ok, configured: editorConfigured() },
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

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Blunt brute-force dampener: a wrong password always costs ~400ms.
  await new Promise((r) => setTimeout(r, 400));

  if (!(await checkPassword(password))) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await createToken();
  if (!token) {
    return NextResponse.json({ error: "Editor misconfigured" }, { status: 503 });
  }

  const store = await cookies();
  store.set(SESSION_COOKIE, token, cookieOptions);
  store.set(HINT_COOKIE, "1", hintCookieOptions);
  return NextResponse.json({ ok: true });
}

/** Sign out. */
export async function DELETE() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  store.set(HINT_COOKIE, "", { ...hintCookieOptions, maxAge: 0 });
  return NextResponse.json({ ok: true });
}
