import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactContent from "../components/ContactContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Roaster, importer or coffee buyer interested in evaluating Nepali green coffee? Send us an enquiry — we aim to reply within two working days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Mewa Valley Coffee",
    description:
      "Roaster, importer or coffee buyer interested in evaluating Nepali green coffee? Send us an enquiry.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <ContactContent />
      </main>
      <Footer phone="+44 7341848470" />
    </>
  );
}
