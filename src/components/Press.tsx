import React from 'react';
import { motion } from 'motion/react';
import { Quote, ArrowUpRight, Newspaper } from 'lucide-react';

interface PressReview {
  id: string;
  publication: string;
  title: string;
  author?: string;
  url: string;
}

// Press coverage grid — designed to grow: add new entries to this array as more
// reviews arrive and the responsive grid of cards expands automatically.
const REVIEWS: PressReview[] = [
  {
    id: 'lovet',
    publication: 'Revista Lovet',
    author: 'Marisa Garza',
    title:
      'El Gran Makhaira: la película noir hecha en Nuevo León con un elenco 100% regio',
    url: 'https://lovet.com.es/el-gran-makhaira/',
  },
];

export default function Press() {
  return (
    <section
      id="press-section"
      className="py-24 relative bg-[#0d131a] overflow-hidden border-t border-[#1a3a4a]/45"
    >
      {/* Ambient background glow, consistent with sibling sections */}
      <div className="absolute top-[20%] right-[15%] w-[600px] h-[300px] rounded-full bg-[#a8d30d]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest">
            PRENSA
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent mx-auto mt-4" />
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500 mt-4">
            La crítica sobre El Gran Makhaira
          </p>
        </div>

        {/* Featured pull quote */}
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <Quote className="w-8 h-8 text-[#a8d30d]/40 mx-auto mb-6" aria-hidden="true" />
          <blockquote
            className="font-display italic font-cinzel-forced text-[#a8d30d] text-3xl sm:text-4xl md:text-5xl leading-tight tracking-wide text-balance drop-shadow-[0_2px_16px_rgba(168,211,13,0.15)]"
            style={{ fontFamily: '"Cinzel", serif' }}
          >
            "El pez se olvida del agua"
          </blockquote>
          <figcaption className="mt-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-slate-400">
            Revista Lovet <span className="text-[#8b0000] mx-1">·</span> Marisa Garza
          </figcaption>
        </motion.figure>

        {/* Coverage summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif-elegant text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto text-center mb-16"
        >
          La crítica describe <span className="text-white font-semibold">El Gran Makhaira</span> como una
          tragedia noir que usa el circo como metáfora del poder, con ecos de Tarkovsky, Kubrick y
          Jodorowsky, y un diálogo filosófico que atraviesa a Camus y Cioran.
        </motion.p>

        {/* Reviews grid — expands as more coverage is added */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, index) => (
            <motion.a
              key={review.id}
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col bg-[#0a0e14] rounded-2xl border border-[#1a3a4a] p-6 sm:p-7 shadow-2xl transition-all duration-300 hover:border-[#a8d30d]/40 hover:-translate-y-1"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Publication badge */}
              <span className="inline-flex items-center gap-1.5 self-start font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded border bg-[#a8d30d]/10 border-[#a8d30d]/20 text-[#a8d30d] mb-5">
                <Newspaper className="w-3 h-3" />
                {review.publication}
              </span>

              {/* Article title */}
              <h3
                className="font-display font-bold text-white text-lg sm:text-xl leading-snug tracking-wide text-balance flex-1 group-hover:text-[#a8d30d] transition-colors"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {review.title}
              </h3>

              {review.author && (
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  Por {review.author}
                </p>
              )}

              {/* CTA */}
              <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest font-bold text-slate-200 group-hover:text-[#a8d30d] transition-colors">
                Leer nota completa
                <ArrowUpRight className="w-4 h-4 text-[#4682b4] group-hover:text-[#a8d30d] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
