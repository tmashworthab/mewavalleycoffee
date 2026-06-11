import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Mewa Valley Coffee — Single Origin Nepal";

export default function Image() {
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
        {/* Subtle vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(10,6,4,0.6) 100%)",
          }}
        />

        {/* Logo mark */}
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#d4a96a" strokeWidth="4" />
          <path
            d="M 11,72 L 28,19 L 43,55 L 50,66 L 57,55 L 72,19 L 89,72"
            stroke="#d4a96a"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
          <ellipse cx="50" cy="76" rx="11" ry="9" stroke="#d4a96a" strokeWidth="3.5" />
          <path
            d="M 50,67 C 46,71 54,75 50,85"
            stroke="#d4a96a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Brand name */}
        <div
          style={{
            color: "#d4a96a",
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: 14,
            marginTop: 28,
            textTransform: "uppercase",
          }}
        >
          MEWA VALLEY
        </div>
        <div
          style={{
            color: "#f5f0ea",
            fontSize: 20,
            letterSpacing: 10,
            marginTop: 10,
            opacity: 0.5,
            textTransform: "uppercase",
          }}
        >
          COFFEE · NEPAL
        </div>
      </div>
    ),
    { ...size }
  );
}
