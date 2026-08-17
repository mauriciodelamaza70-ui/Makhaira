import { motion } from 'motion/react';
import { Download, FileText } from 'lucide-react';

// Direct download of the film's official press kit PDF, stored as a project asset
// in /public so it is served at a stable URL.
const PRESS_KIT_URL = '/El_Gran_Makhaira_Press_Kit.pdf';
const PRESS_KIT_FILENAME = 'El_Gran_Makhaira_Press_Kit.pdf';

export default function PressKit() {
  return (
    <section
      id="press-kit-section"
      className="py-24 relative bg-[#0d131a] overflow-hidden border-t border-[#1a3a4a]/45"
    >
      {/* Ambient background glow, consistent with sibling sections */}
      <div className="absolute top-[20%] left-[15%] w-[600px] h-[300px] rounded-full bg-[#a8d30d]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest">
            PRESS KIT
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent mx-auto mt-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-4">
            Material de prensa oficial
          </p>
        </div>

        {/* Download card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="group relative max-w-xl mx-auto flex flex-col items-center text-center bg-[#0a0e14] rounded-2xl border border-[#1a3a4a] p-8 sm:p-10 shadow-2xl transition-all duration-300 hover:border-[#a8d30d]/40"
        >
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

          <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-[#a8d30d]/20 bg-[#a8d30d]/10 text-[#a8d30d] mb-6">
            <FileText className="w-7 h-7" aria-hidden="true" />
          </span>

          <h3
            className="font-display font-bold text-white text-xl sm:text-2xl leading-snug tracking-wide text-balance"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            El Gran Makhaira — Press Kit 2026
          </h3>

          <p className="mt-3 font-serif-elegant text-slate-300 text-base leading-relaxed max-w-md">
            Sinopsis, notas de dirección, reparto, créditos y datos técnicos de la película en
            formato PDF.
          </p>

          <a
            href={PRESS_KIT_URL}
            download={PRESS_KIT_FILENAME}
            className="mt-8 inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-widest font-bold px-6 py-3.5 rounded-full bg-[#a8d30d] text-[#0a0e14] shadow-lg shadow-[#a8d30d]/20 transition-all duration-300 hover:bg-[#b9e320] hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            Descargar Press Kit (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  );
}
