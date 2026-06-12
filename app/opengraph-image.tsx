import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mewa Valley Coffee — Single Origin Nepal";

export default function Image() {
  const logoData = readFileSync(join(process.cwd(), "public/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1c1814 0%, #2a1e14 45%, #1c1814 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,4,0.6) 100%)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={200} height={200} style={{ mixBlendMode: "screen" }} alt="" />
        <div style={{ color: "#d4a96a", fontSize: 52, fontWeight: 900, letterSpacing: 14, marginTop: 24, textTransform: "uppercase" }}>
          MEWA VALLEY
        </div>
        <div style={{ color: "#f5f0ea", fontSize: 20, letterSpacing: 10, marginTop: 10, opacity: 0.5, textTransform: "uppercase" }}>
          COFFEE · NEPAL
        </div>
      </div>
    ),
    { ...size }
  );
}
