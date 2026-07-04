import React from 'react';

export default function TrailerSection() {
  return (
    <section id="trailer-section" className="py-24 relative bg-[#0d131a] border-t border-[#1a3a4a]/45">
      {/* Visual divider styling matching the rest of the page */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#4682b4]/30 to-transparent" />

      {/* Decorative vertical rails in margins to match cinema aesthetic */}
      <div className="hidden lg:block absolute left-8 top-24 bottom-24 w-[1px] bg-[#1a3a4a]/20 border-l border-[#1a3a4a]/10" />
      <div className="hidden lg:block absolute right-8 top-24 bottom-24 w-[1px] bg-[#1a3a4a]/20 border-r border-[#1a3a4a]/10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="font-mono text-xs text-[#8b0000] uppercase tracking-[0.3em] block font-bold">
            Adelanto Exclusivo
          </span>
          <h2 className="font-display text-4xl font-extrabold text-white tracking-widest mt-2 uppercase">
            TRÁILER OFICIAL
          </h2>
          <div className="w-16 h-[1.5px] bg-[#8b0000] mx-auto mt-6" />
        </div>

        {/* Responsive 16:9 YouTube embed */}
        <div className="relative w-full aspect-video overflow-hidden rounded-lg border border-[#1a3a4a] shadow-2xl shadow-black/50 bg-black">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube-nocookie.com/embed/ftc7mqe4EnE?rel=0"
            title="Tráiler Oficial — El gran Makhaira"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
