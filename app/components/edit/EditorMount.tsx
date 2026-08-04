"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// The editor is only pulled over the wire once someone is actually signed in,
// so ordinary visitors never download any of it.
const EditorOverlay = dynamic(() => import("./EditorOverlay"), { ssr: false });

export default function EditorMount() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    // Ordinary visitors carry no hint cookie, so they never make this request
    // and never download the editor bundle.
    if (!document.cookie.includes("mvc_editor_hint=1")) return;

    let cancelled = false;
    fetch("/api/edit/session", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d?.authenticated) setSignedIn(true);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  if (!signedIn) return null;

  return <EditorOverlay onExit={() => setSignedIn(false)} />;
}
