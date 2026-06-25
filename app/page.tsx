"use client";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import HomeHero from "./components/HomeHero";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HomeHero />
      </main>
      <Footer />
    </>
  );
}
