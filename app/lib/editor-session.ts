/**
 * Minimal signed-cookie session for the content editor.
 *
 * One shared password, set as EDITOR_PASSWORD in the hosting environment —
 * never in the repo. The cookie holds an expiry plus an HMAC of that expiry,
 * so it cannot be forged without the signing secret and cannot be replayed
 * once it lapses.
 */

export const SESSION_COOKIE = "mvc_editor";

/**
 * A readable, non-secret companion flag. It grants nothing — the API always
 * verifies the signed httpOnly cookie above — but it lets the client skip the
 * session request entirely for ordinary visitors, who are the vast majority.
 */
export const HINT_COOKIE = "mvc_editor_hint";

const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

function secretKey(): string | null {
  const secret = process.env.EDITOR_SECRET ?? process.env.EDITOR_PASSWORD;
  return secret && secret.length > 0 ? secret : null;
}

export function editorConfigured(): boolean {
  return Boolean(process.env.EDITOR_PASSWORD) && Boolean(secretKey());
}

async function sign(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Constant-time string comparison, to avoid leaking the password by timing. */
export function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  // Compare a fixed number of bytes so length alone does not short-circuit.
  const len = Math.max(ab.length, bb.length);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < len; i++) {
    diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  }
  return diff === 0;
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = process.env.EDITOR_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export async function createToken(): Promise<string | null> {
  const secret = secretKey();
  if (!secret) return null;
  const expiry = String(Date.now() + MAX_AGE_SECONDS * 1000);
  return `${expiry}.${await sign(expiry, secret)}`;
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  const secret = secretKey();
  if (!secret || !token) return false;

  const [expiry, signature] = token.split(".");
  if (!expiry || !signature) return false;

  const expected = await sign(expiry, secret);
  if (!safeEqual(signature, expected)) return false;

  const expiresAt = Number(expiry);
  return Number.isFinite(expiresAt) && Date.now() < expiresAt;
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};

export const hintCookieOptions = {
  ...cookieOptions,
  httpOnly: false,
};
