"use client";
import Nav from "./Nav";
import Footer from "./Footer";
import Hero from "./home/Hero";
import Premise from "./home/Premise";
import Journey from "./home/Journey";
import Growers from "./home/Growers";
import Coffee from "./home/Coffee";
import Origins from "./home/Origins";
import Verify from "./home/Verify";
import Invitation from "./home/Invitation";

export default function HomeContent() {
  return (
    <>
      <Nav />
      <main id="main">
        {/* 1 — Nepal as an undiscovered origin */}
        <Hero />
        <Premise />

        {/* 2 — the journey to the producers */}
        <Journey />

        {/* 3 — direct relationships with growers */}
        <Growers />

        {/* 4 — what the coffee actually is */}
        <Coffee />

        {/* 5 — where it comes from */}
        <Origins />

        {/* 6 — transparency and independent verification */}
        <Verify />

        {/* 7 — the invitation */}
        <Invitation />
      </main>
      <Footer phone="+44 7341848470" />
    </>
  );
}
