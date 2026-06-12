import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mewa Valley Coffee — Single Origin Nepal";

const bg = "#1c1814";
const gold = "#d4a96a";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(135deg, ${bg} 0%, #2a1e14 45%, ${bg} 100%)`,
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

        {/* Logo mark */}
        <svg width="190" height="190" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke={gold} strokeWidth="4" />
          <path
            d="M 10,72 L 27,18 L 40,52 L 50,37 L 60,52 L 73,18 L 90,72"
            stroke={gold} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="miter"
          />
          <ellipse cx="50" cy="76" rx="12" ry="10" fill={gold} />
          <path d="M 50,66.5 C 46.5,70 53.5,75 50,85.5" stroke={bg} strokeWidth="2.8" strokeLinecap="round" />
        </svg>

        <div style={{ color: gold, fontSize: 52, fontWeight: 900, letterSpacing: 14, marginTop: 28, textTransform: "uppercase" }}>
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
