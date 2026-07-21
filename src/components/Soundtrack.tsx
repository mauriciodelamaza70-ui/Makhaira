import { Music, ListVideo, Film } from 'lucide-react';

// Cover artwork: Romina frente al tablero de lotería (créditos iniciales)
import krakatoaCover from '../assets/images/soundtrack_krakatoa_cover.png';

const KRAKATOA_VIDEO_ID = 'sKX4okPXEyA';
const PLAYLIST_ID = 'PLTMoHXF5aOPU';

export default function Soundtrack() {
  return (
    <section id="soundtrack-section" className="py-24 relative bg-[#0d131a] overflow-hidden border-t border-[#1a3a4a]/45">
      {/* Visual background noise */}
      <div className="absolute top-[30%] left-[25%] w-[800px] h-[300px] rounded-full bg-[#4682b4]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] block font-bold">Sinfonía Herrada</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            BANDA SONORA
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Featured Track — Krakatoa */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0e14] p-6 sm:p-8 rounded-2xl border border-[#1a3a4a] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Cover Artwork */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
                <img
                  src={krakatoaCover}
                  alt="Romina frente al tablero de lotería — fotograma de los créditos iniciales de Makhaira"
                  className="object-cover w-full h-full"
                />
                <span className="absolute bottom-4 left-4 bg-black/80 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-[#1a3a4a]/40 text-[#4682b4] font-bold">
                  Créditos Iniciales
                </span>
              </div>

              {/* Track info */}
              <div className="text-center space-y-1 mb-6">
                <span className="font-mono text-[9px] text-[#8b0000] uppercase tracking-[0.2em] font-bold">TEMA DESTACADO</span>
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  KRAKATOA
                </h3>
                <p className="font-mono text-xs text-slate-500 font-bold uppercase tracking-widest">
                  Canción de créditos iniciales
                </p>
              </div>

              {/* Krakatoa YouTube embed */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg border border-[#1a3a4a]/60">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${KRAKATOA_VIDEO_ID}`}
                  title="Krakatoa — Banda Sonora de Makhaira"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              <p className="mt-4 text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest border-t border-[#1a3a4a]/40 pt-3 flex items-center justify-center gap-2">
                <Film className="w-3.5 h-3.5 text-[#a8d30d]" />
                Reproducción vía YouTube
              </p>
            </div>
          </div>

          {/* Column 2: Full Soundtrack Playlist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8b0000]/15 border border-[#8b0000]/30 rounded-full">
                <Music className="w-3.5 h-3.5 text-[#8b0000]" />
                <span className="font-mono text-[10px] text-[#8b0000] tracking-widest uppercase font-bold">Playlist Completa</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider">
                LA BANDA SONORA COMPLETA
              </h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                La partitura completa de <strong className="text-white">Makhaira</strong>, compuesta por <strong className="text-white">Mauricio de la Maza</strong>. Navega y reproduce cada pista directamente desde el reproductor de la lista de YouTube.
              </p>
            </div>

            {/* Playlist YouTube embed */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-[#1a3a4a]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/videoseries?list=${PLAYLIST_ID}`}
                title="Banda Sonora Completa de Makhaira — Playlist"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-2">
              <ListVideo className="w-3.5 h-3.5 text-[#4682b4]" />
              Usa los controles del reproductor para cambiar de pista
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
