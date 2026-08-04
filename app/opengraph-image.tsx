import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Mewa Valley Coffee — green coffee from the hills of eastern Nepal";

export default function Image() {
  const photo = readFileSync(join(process.cwd(), "app/media/og-base.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          fontFamily: "sans-serif",
          backgroundColor: "#141210",
        }}
      >
        <img
          src={photoSrc}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", inset: 0, objectFit: "cover" }}
        />

        {/* Scrim so the wordmark stays legible over the mist. Satori needs
            explicit dimensions here — `inset: 0` alone paints nothing. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage:
              "linear-gradient(to top, rgba(16,14,12,0.96) 0%, rgba(16,14,12,0.82) 34%, rgba(16,14,12,0.42) 66%, rgba(16,14,12,0.25) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 72,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "#c9a468",
              fontSize: 20,
              letterSpacing: 8,
              textTransform: "uppercase",
              marginBottom: 26,
            }}
          >
            Mewa Valley Coffee
          </div>
          <div
            style={{
              color: "#f2ede6",
              fontSize: 66,
              lineHeight: 1.1,
              maxWidth: 760,
              letterSpacing: -1,
            }}
          >
            Coffee grows here.
          </div>
          <div
            style={{
              color: "rgba(242,237,230,0.6)",
              fontSize: 30,
              marginTop: 16,
            }}
          >
            Eastern Nepal · green coffee for UK and European roasters
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
