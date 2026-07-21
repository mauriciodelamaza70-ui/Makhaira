import { useState, useRef } from 'react';
import { Play, Pause, ListVideo } from 'lucide-react';

// Cover artwork: Romina frente al tablero de lotería (créditos iniciales)
import krakatoaCover from '../assets/images/soundtrack_krakatoa_cover.png';

const KRAKATOA_VIDEO_ID = 'sKX4okPXEyA';

interface Track {
  id: string;
  title: string;
  length: string;
}

// Pistas de la playlist oficial del soundtrack (PLTMoHXF5aOPU)
const TRACKS: Track[] = [
  { id: 'ftc7mqe4EnE', title: 'El gran Makhaira (Tráiler oficial 2026)', length: '1:21' },
  { id: 'sKX4okPXEyA', title: 'Krakatoa', length: '6:12' },
  { id: '6Ii2-JAcJWs', title: 'Dulce sensación', length: '1:45' },
  { id: 'Lg6SkhdBKQI', title: 'El gallo petenero', length: '3:15' },
  { id: 'K8Yu4dwh7Ho', title: 'Pollitos vs fantasmas (Chicks vs Ghosts)', length: '2:18' },
  { id: 'rA-0RYHLk64', title: 'El lanzador de cuchillos / Knife Thrower', length: '1:59' },
  { id: 'dLtLNfmy24k', title: 'Los salvajes', length: '3:07' },
  { id: 'w0q-n5-2YFM', title: 'La danza del Hada', length: '2:01' },
  { id: 'StAwDGMAu30', title: 'Prieta de mi amor', length: '3:14' },
  { id: '8hqyaiI2EGk', title: 'Pinche punk (feat. Ana González)', length: '4:24' },
  { id: 'AR3BTkI7FJA', title: 'Comienza la función (May the Show begin)', length: '2:52' },
  { id: 'KD1k-ltg-a4', title: 'La niña de blanco (Girl in White) (feat. Ana González)', length: '5:20' },
  { id: 'wFhogRjLi04', title: 'QUANTUM 2', length: '5:03' },
  { id: 'iS9aQd9KpoM', title: 'Quantum', length: '6:06' },
  { id: 'EwtKi7x0pJw', title: 'Campanas (Bells)', length: '5:34' },
  { id: 'Nec4b1h6mTM', title: 'Punto y coma', length: '3:04' },
  { id: 'bC7vvw95b08', title: 'Ricercar electrónico', length: '7:32' },
  { id: 'ClqY52XoNro', title: 'Fantasía para Moog', length: '5:20' },
  { id: '-oOaxtzCZGE', title: 'Diégesis', length: '3:56' },
  { id: 'gBlY-DcsMFI', title: 'Krakatoa (versión alterna)', length: '6:12' },
  { id: '2pjmzVKEDTA', title: 'Festín romano (Roman Feast)', length: '3:43' },
  { id: 'ANEWk9m67BA', title: 'El domador (The Tamer)', length: '3:57' },
  { id: 'lned_uVHFiw', title: 'Pervert', length: '1:30' },
  { id: 'SHsvdWICtG8', title: 'Quantum 2 (feat. Ana González)', length: '5:01' },
  { id: 'b1GdrEDisAc', title: 'Quantum (feat. Ana González)', length: '6:06' },
  { id: 'taWocHsVbTM', title: 'Pinche punk (Punk) (feat. Ana González)', length: '4:24' },
];

export default function Soundtrack() {
  const [krakatoaPlaying, setKrakatoaPlaying] = useState(false);
  const krakatoaRef = useRef<HTMLIFrameElement>(null);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  function toggleKrakatoa() {
    const frame = krakatoaRef.current;
    if (!frame || !frame.contentWindow) return;
    const func = krakatoaPlaying ? 'pauseVideo' : 'playVideo';
    frame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*',
    );
    setKrakatoaPlaying((prev) => !prev);
  }

  return (
    <section id="soundtrack-section" className="py-24 relative bg-[#0d131a] overflow-hidden border-t border-[#1a3a4a]/45">
      {/* Visual background noise */}
      <div className="absolute top-[30%] left-[25%] w-[800px] h-[300px] rounded-full bg-[#4682b4]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest">
            BANDA SONORA
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Featured Track — Krakatoa */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0e14] p-6 sm:p-8 rounded-2xl border border-[#1a3a4a] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Discreet hidden Krakatoa player (audio only, no visible UI) */}
              <div className="absolute inset-0 -z-10 opacity-0 pointer-events-none" aria-hidden="true">
                <iframe
                  ref={krakatoaRef}
                  width="320"
                  height="180"
                  src={`https://www.youtube.com/embed/${KRAKATOA_VIDEO_ID}?enablejsapi=1&playsinline=1&rel=0`}
                  title="Reproductor oculto de Krakatoa"
                  allow="autoplay; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Cover Artwork */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
                <img
                  src={krakatoaCover}
                  alt="Romina frente al tablero de lotería — fotograma de los créditos iniciales de Makhaira"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Track info */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  El Gran Makhaira
                </h3>
              </div>

              {/* Minimalist play button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={toggleKrakatoa}
                  aria-pressed={krakatoaPlaying}
                  aria-label={krakatoaPlaying ? 'Pausar Krakatoa' : 'Reproducir Krakatoa'}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-[#a8d30d] text-[#0a0e14] hover:bg-[#b9e320] transition-colors shadow-lg shadow-[#a8d30d]/20 cursor-pointer"
                >
                  {krakatoaPlaying ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-0.5" fill="currentColor" />
                  )}
                </button>
              </div>

              <p className="mt-4 text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest">
                {krakatoaPlaying ? 'Reproduciendo…' : 'Presiona para escuchar'}
              </p>
            </div>
          </div>

          {/* Column 2: Full Soundtrack Track List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider">
                LA BANDA SONORA COMPLETA
              </h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Banda sonora original de <strong className="text-white">El Gran Makhaira</strong>, compuesta por <strong className="text-white">Mauricio de la Maza Benignos</strong>.
              </p>
            </div>

            {/* Track list */}
            <ul className="divide-y divide-[#1a3a4a]/40 rounded-2xl border border-[#1a3a4a] bg-[#0a0e14] overflow-hidden">
              {TRACKS.map((track, index) => {
                const isActive = activeTrack === track.id;
                return (
                  <li key={`${track.id}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setActiveTrack(isActive ? null : track.id)}
                      aria-expanded={isActive}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-colors cursor-pointer ${
                        isActive ? 'bg-[#a8d30d]/10' : 'hover:bg-white/5'
                      }`}
                    >
                      {/* Index / play indicator */}
                      <span className="flex items-center justify-center w-6 shrink-0 font-mono text-xs text-slate-500">
                        {isActive ? (
                          <Pause className="w-4 h-4 text-[#a8d30d]" fill="currentColor" />
                        ) : (
                          <span className="group-hover:hidden">{String(index + 1).padStart(2, '0')}</span>
                        )}
                      </span>

                      {/* Thumbnail */}
                      <span className="relative w-16 shrink-0 aspect-video rounded-md overflow-hidden bg-black">
                        <img
                          src={`https://i.ytimg.com/vi/${track.id}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="object-cover w-full h-full"
                        />
                        {!isActive && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                            <Play className="w-4 h-4 text-white" fill="currentColor" />
                          </span>
                        )}
                      </span>

                      {/* Title */}
                      <span className="flex-1 min-w-0">
                        <span className={`block truncate text-sm font-medium ${isActive ? 'text-[#a8d30d]' : 'text-white'}`}>
                          {track.title}
                        </span>
                        <span className="block font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                          Mauricio de la Maza
                        </span>
                      </span>

                      {/* Duration */}
                      <span className="shrink-0 font-mono text-xs text-slate-500 tabular-nums">
                        {track.length}
                      </span>
                    </button>

                    {/* Inline player for the active track */}
                    {isActive && (
                      <div className="px-4 pb-4">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-lg border border-[#1a3a4a]/60">
                          <iframe
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${track.id}?autoplay=1&rel=0`}
                            title={`${track.title} — Banda Sonora de Makhaira`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                          />
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="text-[9px] text-slate-500 font-mono uppercase tracking-widest flex items-center gap-2">
              <ListVideo className="w-3.5 h-3.5 text-[#4682b4]" />
              {TRACKS.length} pistas · Toca una para reproducir
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
