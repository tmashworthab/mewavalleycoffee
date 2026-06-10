import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";

export const metadata = {
  title: "Sample Lots - Mewa Valley Coffee",
  description: "Green coffee sample lots from Nepal - arriving after July 2026.",
};

const lotFields = [
  "Lot reference",
  "Producer / cooperative",
  "District",
  "Altitude (metres)",
  "Variety",
  "Processing method",
  "Harvest date",
  "Bag weight available",
  "Cupping notes",
  "Sample availability",
];

export default function SampleLots() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Green Coffee"
          title="Sample Lots"
          subtitle="Lot sheets will be published here after our July 2026 sourcing trip. Register your interest to be notified when samples are available."
        />

        {/* Status banner */}
        <section className="px-6 py-10">
          <div className="max-w-4xl mx-auto">
            <div className="border border-[#d4a96a]/30 bg-[#d4a96a]/5 px-8 py-6 flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-[#d4a96a] flex-shrink-0 mt-1 md:mt-0" />
              <p className="text-[#f5f0ea]/70 text-sm leading-relaxed">
                <span className="text-[#d4a96a] font-bold">First lots arriving after July 2026 sourcing trip.</span>
                {" "}We are visiting producers in Nepal in July 2026 to document and select green coffee for UK and EU roasters.
                Sample lots will be listed here in lot-sheet format once confirmed.
              </p>
            </div>
          </div>
        </section>

        {/* Placeholder lot sheet */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-8">Lot sheet format - example</p>

            <div className="border border-[#d4a96a]/15 overflow-hidden">
              {/* Header */}
              <div className="bg-[#d4a96a]/10 border-b border-[#d4a96a]/15 px-6 py-4 flex items-center justify-between">
                <p className="text-sm font-bold tracking-widest uppercase text-[#f5f0ea]">
                  LOT MVC-001
                </p>
                <span className="text-[9px] tracking-[0.3em] uppercase bg-[#d4a96a]/20 text-[#d4a96a] px-3 py-1 font-bold">
                  Pending - July 2026
                </span>
              </div>

              {/* Fields */}
              <div className="divide-y divide-[#d4a96a]/10">
                {lotFields.map((field) => (
                  <div key={field} className="grid grid-cols-2 px-6 py-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4a96a]/60 font-medium">{field}</p>
                    <p className="text-sm text-[#f5f0ea]/20 italic">To be confirmed</p>
                  </div>
                ))}
              </div>

              <div className="px-6 py-5 border-t border-[#d4a96a]/15 bg-[#d4a96a]/5">
                <p className="text-xs text-[#f5f0ea]/30 leading-relaxed">
                  Each lot will include full producer documentation, processing details, and green sample availability for cupping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notify CTA */}
        <section className="py-16 px-6 border-t border-[#d4a96a]/15">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">Be first to know</p>
              <p className="text-xl font-bold text-[#f5f0ea]">Register your interest and we will contact you when samples are ready.</p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 px-10 py-4 bg-[#d4a96a] text-[#1c1814] text-xs tracking-[0.3em] uppercase font-bold hover:bg-[#e0be88] transition-colors"
            >
              Register Interest
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
