import Nav from "../components/Nav";
import Footer from "../components/Footer";
import AboutContent from "../components/AboutContent";

export const metadata = {
  title: "About Us - Mewa Valley Coffee",
  description: "Our story and the Nepali hill districts we're sourcing green coffee from.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
