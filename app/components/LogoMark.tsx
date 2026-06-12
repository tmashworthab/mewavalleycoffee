interface LogoMarkProps {
  size?: number;
  color?: string;
  bgColor?: string; // for the filled bean crease — should match background
}

export default function LogoMark({ size = 88, color = "#d4a96a", bgColor = "#1c1814" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle */}
      <circle cx="50" cy="50" r="44" stroke={color} strokeWidth="4" />

      {/* Three-peak mountain M shape:
          outer-left peak (tall) → valley → center peak (shorter) → valley → outer-right peak (tall)
          outer legs extend to circle edge at bottom */}
      <path
        d="M 10,72 L 27,18 L 40,52 L 50,37 L 60,52 L 73,18 L 90,72"
        stroke={color}
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="miter"
        fill="none"
      />

      {/* Coffee bean — filled oval with center crease */}
      <ellipse cx="50" cy="76" rx="12" ry="10" fill={color} />
      {/* Center crease using background color to cut through the filled bean */}
      <path
        d="M 50,66.5 C 46.5,70 53.5,75 50,85.5"
        stroke={bgColor}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
