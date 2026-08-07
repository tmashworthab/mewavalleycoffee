"use client";
import Hero from "./home/Hero";
import Premise from "./home/Premise";
import Coffee from "./home/Coffee";
import Origins from "./home/Origins";
import Invitation from "./home/Invitation";
import Filmstrip from "./home/Filmstrip";

export default function HomeContent() {
  return (
    <>
      {/* 1 — Nepal as an undiscovered origin */}
      <Hero />
      <Premise />

      {/* 2 — what the coffee actually is */}
      <Coffee />

      {/* 3 — where it comes from */}
      <Origins />

      {/* 4 — the invitation */}
      <Invitation />

      {/* 5 — closing photography */}
      <Filmstrip />
    </>
  );
}
