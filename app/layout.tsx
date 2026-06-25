import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageProvider } from "./lib/language";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mewa Valley Coffee | Premium High-Altitude Nepali Coffee",
  description:
    "Mewa Valley Coffee connects UK and European roasters with premium high-altitude Nepali coffee. Gulmi 2026 washed and natural Arabica samples are pending independent UK cupping.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
