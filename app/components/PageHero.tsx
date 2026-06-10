interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-16 px-6 border-b border-[#d4a96a]/15">
      <div className="max-w-4xl mx-auto">
        <p className="text-[10px] tracking-[0.5em] uppercase text-[#d4a96a] mb-4">{eyebrow}</p>
        <h1 className="text-4xl md:text-6xl font-black tracking-widest uppercase text-[#f5f0ea] leading-none mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[#f5f0ea]/50 text-lg max-w-2xl leading-relaxed font-light">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
