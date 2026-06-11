import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1c1814",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="#d4a96a" strokeWidth="5" />
          <path
            d="M 11,72 L 28,19 L 43,55 L 50,66 L 57,55 L 72,19 L 89,72"
            stroke="#d4a96a"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
          <ellipse cx="50" cy="76" rx="11" ry="9" stroke="#d4a96a" strokeWidth="4.5" />
          <path
            d="M 50,67 C 46,71 54,75 50,85"
            stroke="#d4a96a"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
