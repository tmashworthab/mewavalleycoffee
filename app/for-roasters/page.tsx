import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ForRoastersContent from "../components/ForRoastersContent";

export const metadata = {
  title: "For Roasters | Nepali Green Coffee Samples | Mewa Valley Coffee",
  description:
    "Register interest in Gulmi 2026 Nepali Arabica green coffee samples. Washed and natural lots, supplier-reported 81-85 cup score, independent UK cupping pending.",
};

export default function ForRoasters() {
  return (
    <>
      <Nav />
      <main>
        <ForRoastersContent />
      </main>
      <Footer />
    </>
  );
}
