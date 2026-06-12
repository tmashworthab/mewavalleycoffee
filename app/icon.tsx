import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const bg = "#1c1814";
const gold = "#d4a96a";

export default function Icon() {
  return new ImageResponse(
    (
      <div style={{ background: bg, width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke={gold} strokeWidth="5" />
          <path
            d="M 10,72 L 27,18 L 40,52 L 50,37 L 60,52 L 73,18 L 90,72"
            stroke={gold} strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="miter"
          />
          <ellipse cx="50" cy="76" rx="12" ry="10" fill={gold} />
          <path d="M 50,66.5 C 46.5,70 53.5,75 50,85.5" stroke={bg} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
