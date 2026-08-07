import type { Metadata, Viewport } from "next";
import {
  Geist,
  Newsreader,
  Instrument_Serif,
  Cormorant_Garamond,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/* Optional typefaces the editor can pick. preload is off so they cost nothing
   for the majority of visitors, who only ever see the two defaults above. */

const instrument = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-classic",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  preload: false,
});

const grotesk = Space_Grotesk({
  variable: "--font-modern",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mewavalley.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mewa Valley Coffee — Green coffee from the hills of eastern Nepal",
    template: "%s — Mewa Valley Coffee",
  },
  description:
    "Nepal grows coffee that almost no one in Europe has tasted. We travel the hill districts of Koshi and Lumbini, meet the people who grow it, and bring their green coffee to UK and European roasters.",
  keywords: [
    "Nepali green coffee",
    "Nepal coffee origin",
    "green coffee importer UK",
    "specialty coffee Nepal",
    "Gulmi coffee",
    "Ilam coffee",
    "green coffee sourcing",
  ],
  authors: [{ name: "Mewa Valley Coffee" }],
  creator: "Mewa Valley Coffee",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: "Mewa Valley Coffee",
    title: "Mewa Valley Coffee — Green coffee from the hills of eastern Nepal",
    description:
      "Nepal grows coffee that almost no one in Europe has tasted. We go to the hills, meet the growers, and bring their green coffee to UK and European roasters.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mewa Valley Coffee — Green coffee from the hills of eastern Nepal",
    description:
      "Nepal grows coffee that almost no one in Europe has tasted. We go to the hills, meet the growers, and bring their green coffee to UK and European roasters.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#141210",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${newsreader.variable} ${instrument.variable} ${cormorant.variable} ${grotesk.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
