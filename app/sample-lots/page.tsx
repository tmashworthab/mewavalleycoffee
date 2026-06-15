import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "Sample Lots | Gulmi 2026 Nepali Coffee | Mewa Valley Coffee",
  description:
    "View pending Gulmi 2026 washed and natural Arabica sample lot information from Nepal. Supplier-reported data, independent UK cupping pending.",
};

const washedFields = [
  { field: "Status", info: "Pending sample verification" },
  { field: "Origin", info: "Gulmi District, Lumbini Province, Nepal" },
  { field: "Municipality", info: "Resunga Municipality" },
  { field: "Producer/cooperative", info: "Established Gulmi cooperative, legal export name being confirmed" },
  { field: "Altitude", info: "1,100+ masl" },
  { field: "Species", info: "Arabica" },
  { field: "Variety", info: "Local Gulmi Arabica, verification pending" },
  { field: "Process", info: "Washed" },
  { field: "Harvest", info: "January–March 2026" },
  { field: "Moisture", info: "Supplier-reported below 11%" },
  { field: "Cup score", info: "Supplier-reported 81–85, independent UK cupping pending" },
  { field: "Available volume", info: "Part of supplier-reported 5,000–6,000kg total" },
  { field: "Sample sizes", info: "300g, 1kg or 5kg green coffee" },
  { field: "Export documents", info: "Commercial invoice, packing list, certificate of origin, phytosanitary certificate" },
];

const naturalFields = washedFields.map((f) =>
  f.field === "Process" ? { field: "Process", info: "Natural" } : f
);

function LotTable({ lotRef, fields }: { lotRef: string; fields: { field: string; info: string }[] }) {
  return (
    <div className="border border-[#d4a96a]/15 overflow-hidden">
      <div className="bg-[#d4a96a]/10 border-b border-[#d4a96a]/15 px-6 py-4 flex items-center justify-between">
        <p className="text-sm font-bold tracking-widest uppercase text-[#f5f0ea]">{lotRef}</p>
        <span className="text-[9px] tracking-[0.3em] uppercase bg-[#d4a96a]/20 text-[#d4a96a] px-3 py-1 font-bold">
          Pending verification
        </span>
      </div>
      <div className="divide-y divide-[#d4a96a]/10">
        {fields.map((row) => (
          <div key={row.field} className="grid grid-cols-2 px-6 py-4">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4a96a]/60 font-medium">{row.field}</p>
            <p className="text-sm text-[#f5f0ea]/70">{row.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SampleLots() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Green Coffee"
          title="Sample Lots"
          subtitle="Our first sample lots are currently being arranged from Gulmi District, Nepal. All details below are supplier-reported and subject to sample verification, lot confirmation and independent UK cupping."
        />

        {/* Status banner */}
        <section className="px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <div className="border border-[#d4a96a]/30 bg-[#d4a96a]/5 px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-[#d4a96a] flex-shrink-0 mt-1 md:mt-0" />
                <p className="text-[#f5f0ea]/70 text-sm leading-relaxed">
                  <span className="text-[#d4a96a] font-bold">These are not yet confirmed commercial lots.</span>
                  {" "}Samples must be independently cupped in the UK before any claims are made about final score, flavour profile or specialty status.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Lot sheets */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            <Reveal>
              <LotTable lotRef="MVC-GULMI-2026-WASHED" fields={washedFields} />
            </Reveal>
            <Reveal delay={80}>
              <LotTable lotRef="MVC-GULMI-2026-NATURAL" fields={naturalFields} />
            </Reveal>

            <Reveal delay={160}>
              <div className="border-l-2 border-[#d4a96a]/30 pl-6">
                <p className="text-sm text-[#f5f0ea]/40 leading-relaxed">
                  These are not yet confirmed commercial lots. Samples must be independently cupped in the UK before any claims are made about final score, flavour profile or specialty status.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Notify CTA */}
        <Reveal>
          <section className="py-16 px-6 border-t border-[#d4a96a]/15">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">Be first to know</p>
                <p className="text-xl font-bold text-[#f5f0ea]">Register your interest and we will contact you when samples are ready for UK cupping.</p>
              </div>
              <Link
                href="/contact"
                className="flex-shrink-0 px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-all duration-300"
              >
                Register Interest
              </Link>
            </div>
          </section>
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
