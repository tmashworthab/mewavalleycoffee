import Link from "next/link";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";

export const metadata = {
  title: "For Roasters | Nepali Green Coffee Samples | Mewa Valley Coffee",
  description:
    "Register interest in Gulmi 2026 Nepali Arabica green coffee samples. Washed and natural lots, supplier-reported 81-85 cup score, independent UK cupping pending.",
};

const supplierTable = [
  { field: "Origin", info: "Gulmi District, Lumbini Province, Nepal" },
  { field: "Municipality", info: "Resunga Municipality" },
  { field: "Altitude", info: "1,100+ masl" },
  { field: "Species", info: "Arabica" },
  { field: "Variety", info: "Local Gulmi Arabica, verification pending" },
  { field: "Processes", info: "Washed and natural" },
  { field: "Harvest", info: "January–March 2026" },
  { field: "Moisture", info: "Supplier-reported below 11%" },
  { field: "Cup score", info: "Supplier-reported 81–85 points" },
  { field: "Available volume", info: "Approximately 5,000–6,000kg" },
  { field: "Sample sizes", info: "300g, 1kg or 5kg green samples" },
  { field: "Export history", info: "Exporting since 1999" },
  { field: "Export markets", info: "Reported exports to France and Japan" },
  { field: "UK cupping", info: "Pending" },
];

const lotItems = [
  "Producer or cooperative details",
  "District and growing area",
  "Altitude in masl",
  "Variety information, where known",
  "Processing method",
  "Harvest period",
  "Moisture content",
  "Available volume",
  "Export documentation status",
  "Sample size availability",
  "Cupping feedback",
  "Photos and traceability notes, where permission is granted",
];

export default function ForRoasters() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          eyebrow="Buyers"
          title="For Roasters"
          subtitle="Mewa Valley Coffee is preparing documented Nepali green coffee samples for UK and European roasters. Our focus is on traceability, clear lot information and honest quality verification before any commercial launch."
        />

        {/* Where we are now */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">Where we are now</h2>
            </Reveal>
            <Reveal delay={80} className="md:col-span-2">
              <p className="text-[#f5f0ea]/60 leading-relaxed mb-4">
                We are currently speaking with an established coffee cooperative in Gulmi District, Lumbini Province, Nepal. Supplier-reported information indicates Arabica coffee grown at 1,100+ masl, washed and natural processing, moisture below 11%, and cup scores in the 81–85 range.
              </p>
              <p className="text-[#f5f0ea]/60 leading-relaxed">
                We are treating these details as supplier-reported until samples are independently cupped in the UK. Our July 2026 sourcing visit will focus on verifying lot information, documenting processing and storage, confirming export terms, and arranging properly labelled green coffee samples for roasters.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Current supplier info table */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto">
            <Reveal>
              <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-8">Current Gulmi Supplier Information</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="border border-[#d4a96a]/15 overflow-hidden">
                <div className="bg-[#d4a96a]/10 border-b border-[#d4a96a]/15 px-6 py-3">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#d4a96a]/70 font-bold">All information below is supplier-reported · Independent UK cupping pending</p>
                </div>
                <div className="divide-y divide-[#d4a96a]/10">
                  {supplierTable.map((row) => (
                    <div key={row.field} className="grid grid-cols-2 px-6 py-4">
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#d4a96a]/60 font-medium">{row.field}</p>
                      <p className="text-sm text-[#f5f0ea]/70">{row.info}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What roasters can expect */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">What roasters can expect</h2>
            </Reveal>
            <Reveal delay={80} className="md:col-span-2">
              <p className="text-[#f5f0ea]/60 leading-relaxed mb-6">For each confirmed sample, we aim to provide:</p>
              <ul className="space-y-3">
                {lotItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#f5f0ea]/60 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-[#d4a96a]/50 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* Volumes */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">Volumes</h2>
            </Reveal>
            <Reveal delay={80} className="md:col-span-2">
              <p className="text-[#f5f0ea]/60 leading-relaxed">
                The current Gulmi supplier has reported approximately 5,000–6,000kg available across washed and natural coffees. For the UK market, we expect to begin with small sample-led pilot lots, likely 50–300kg, depending on cupping results and roaster interest.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20 px-6 border-b border-[#d4a96a]/10">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            <Reveal>
              <h2 className="text-sm font-bold tracking-[0.15em] uppercase text-[#d4a96a]">Pricing</h2>
            </Reveal>
            <Reveal delay={80} className="md:col-span-2">
              <p className="text-[#f5f0ea]/60 leading-relaxed">
                Indicative pricing is available for qualified roaster and importer enquiries. Final pricing will depend on process, lot quality, volume, export terms and independent cupping results.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CTA band */}
        <Reveal>
          <section className="py-16 px-6 border-t border-[#d4a96a]/15">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div>
                <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-2">Interested?</p>
                <p className="text-xl font-bold text-[#f5f0ea]">Interested in cupping Nepali green coffee samples?</p>
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
