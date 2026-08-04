import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AboutContent from "../components/AboutContent";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Who we are and which Nepali hill districts we source green coffee from — Gulmi, Bhojpur, Ilam and Solukhumbu, across Koshi and Lumbini provinces.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About us — Mewa Valley Coffee",
    description:
      "Who we are and which Nepali hill districts we source green coffee from.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <AboutContent />
      </main>
      <Footer phone="+44 7341848470" />
    </>
  );
}
