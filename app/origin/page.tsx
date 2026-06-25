import Nav from "../components/Nav";
import Footer from "../components/Footer";
import OriginContent from "../components/OriginContent";

export const metadata = {
  title: "Origin - Mewa Valley Coffee",
  description: "The geography, climate, and growing conditions behind Nepali specialty coffee.",
};

export default function OriginPage() {
  return (
    <>
      <Nav />
      <main>
        <OriginContent />
      </main>
      <Footer />
    </>
  );
}
