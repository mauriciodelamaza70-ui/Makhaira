import { useState, useRef } from 'react';
import { Play, Pause, ListVideo } from 'lucide-react';

// Cover artwork: Romina frente al tablero de lotería (créditos iniciales)
import krakatoaCover from '../assets/images/soundtrack_krakatoa_cover.png';
// Cover artwork: acróbata enmascarada (Comienza la función)
import funcionCover from '../assets/images/soundtrack_funcion_cover.png';
// Cover artwork: bailarina en antro con luces azules (Pervert)
import pervertCover from '../assets/images/soundtrack_pervert_cover.png';

const KRAKATOA_VIDEO_ID = 'sKX4okPXEyA';
const FUNCION_VIDEO_ID = 'AR3BTkI7FJA';
// Pervert plays an embedded video (replaces the cover) instead of hidden audio
const PERVERT_VIDEO_PLAY_ID = 'ibi-OdcbD7U';

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
  const [funcionPlaying, setFuncionPlaying] = useState(false);
  const funcionRef = useRef<HTMLIFrameElement>(null);
  // Pervert card: controls whether the cover photo+button or the YouTube iframe is shown
  const [pervertVideoPlaying, setPervertVideoPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState<string | null>(null);

  function togglePlayer(
    frame: HTMLIFrameElement | null,
    playing: boolean,
    setPlaying: (updater: (prev: boolean) => boolean) => void,
  ) {
    if (!frame || !frame.contentWindow) return;
    const func = playing ? 'pauseVideo' : 'playVideo';
    frame.contentWindow.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*',
    );
    setPlaying((prev) => !prev);
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

        {/* Editorial intro — same bilingual layout as the official synopsis (ES first, then English translation) */}
        <div className="max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4682b4]/10 border border-[#4682b4]/30 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#4682b4]" />
            <span className="font-display font-bold text-[11px] text-[#4682b4] tracking-[0.2em] uppercase [font-variant:small-caps]">
              Sobre la música
            </span>
          </div>

          {/* Bloque en Español */}
          <div className="space-y-4 text-left md:text-justify">
            <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
              La música de <span className="font-semibold text-white">El Gran Makhaira</span> es obra de Mauricio de la Maza-Benignos, distribuida en varios álbumes disponibles en la playlist de este sitio. Toda tiene el mismo peso dentro de la película — pero nace de dos procesos distintos.
            </p>
            <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
              <strong className="font-semibold text-white">Anacronía</strong> reúne piezas preexistentes llevadas a un lugar que no les pertenecía. Parte de una pregunta: ¿cómo sonarían Frescobaldi, Gibbons, Rameau o el Himno de Hurrian —3,400 años más antiguo que el sintetizador Moog, y aquí reconstruido— si hubieran tenido acceso a él? Los arreglos de <em>Ricercar</em> (Frescobaldi) y <em>Fantasía</em> (Gibbons) respetan casi en su totalidad la melodía y la armonía originales, escritas para clave; lo que cambia de forma radical es el tempo, la instrumentación, y también algo más sutil — ligeros legatos que un instrumento de cuerda pulsada, incapaz de sostener el sonido, nunca podría haber ofrecido. <em>Les Sauvages</em> (Rameau), danza cortesana original, conserva su partitura pero endurece la percusión hasta representar ya no una corte, sino un poder que no necesita exhibirse porque se ha vuelto estructura. No es nostalgia ni modernización: es un cortocircuito temporal donde el instrumento más antiguo y el más nuevo se encuentran sin pedirse permiso.
            </p>
            <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
              El resto de la partitura es enteramente original. El tema del show de Makhaira repite siempre el mismo ciclo de órgano Hammond y ráfagas metálicas de Moog, como el acto que se ejecuta una y otra vez bajo la premisa de que nunca puede fallar. <em>Prieta de mi Amor</em> y <em>El Gallo Petenero</em> marcan los instantes en que Eitán se despoja de cualquier máscara: la primera imagina cómo habría sonado, compuesta hoy, una pieza surgida del México de los setenta a partir de la cumbia psicodélica; la segunda se inspira en <em>La Petenera</em>, uno de los sones más antiguos del repertorio mexicano, pero reconstruye desde cero su estructura profunda en clave de polka norteña con sintetizadores.
            </p>
            <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
              <strong className="font-semibold text-white">Leitmotive.</strong> <em>Ricercar</em>, <em>Fantasía</em>, <em>Les Sauvages</em> y el tema del show de Makhaira no aparecen una sola vez: regresan a lo largo de la película y se transforman con cada retorno. <em>Ricercar</em> acompaña la conciencia silenciosa de Romina; <em>Fantasía</em> se siembra desde temprano y solo se resuelve en la revelación final; <em>Les Sauvages</em> es el motivo del sistema de poder que encarna el senador; el tema del show se degrada como ritual cada vez que vuelve. <em>Punto y Coma</em>, en cambio, es la excepción deliberada: traduce el paso de Marcos —corto y decisivo, luego arrastrado— a valores musicales, y suena una sola vez, en el instante exacto en que el relato cuestiona la estructura del sistema social. No es un motivo que regresa; es una intervención de metalenguaje.
            </p>
            <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
              Cada nivel del mundo narrativo de la película —el espectáculo, el sistema de poder, la conciencia silenciosa, la anomalía— tiene su propio registro sonoro, y el silencio ocupa los tramos donde ese registro es la ausencia deliberada de comentario musical: una decisión compositiva más, no una carencia.
            </p>
          </div>

          {/* Divisor Elegante */}
          <div className="flex items-center gap-4 py-2 mt-6">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1a3a4a] via-[#4682b4]/30 to-transparent" />
            <span className="font-display font-medium text-[9px] uppercase tracking-[0.3em] text-[#4682b4]">English Translation</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-[#1a3a4a] via-[#4682b4]/30 to-transparent" />
          </div>

          {/* Bloque en Inglés */}
          <div className="space-y-4 text-left md:text-justify italic mt-6">
            <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
              The music of <span className="font-semibold not-italic text-slate-200">The Great Makhaira</span> is the work of Mauricio de la Maza-Benignos, spread across several albums available in the playlist on this site. All of it carries equal weight within the film — but it comes from two distinct processes.
            </p>
            <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
              <strong className="font-semibold not-italic text-slate-200">Anacronía</strong> gathers pre-existing pieces and carries them somewhere they never belonged. It starts from a question: what would Frescobaldi, Gibbons, Rameau, or the Hurrian Hymn — 3,400 years older than the Moog synthesizer, and reconstructed here — have sounded like if they’d had access to one? The arrangements of <em className="not-italic">Ricercar</em> (Frescobaldi) and <em className="not-italic">Fantasía</em> (Gibbons) preserve almost all of the original melody and harmony, written for harpsichord; what changes radically is the tempo, the instrumentation, and something subtler still — slight legatos that a plucked string instrument, unable to sustain sound, could never have offered. <em className="not-italic">Les Sauvages</em> (Rameau), originally a courtly dance, keeps its score intact but hardens the percussion until it no longer represents a court, but a power that no longer needs to display itself because it has become structure. It is neither nostalgia nor modernization: it is a temporal short circuit where the oldest instrument and the newest meet without asking permission.
            </p>
            <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
              The rest of the score is entirely original. Makhaira’s show theme repeats the same cycle of Hammond organ and metallic Moog bursts every time, like the act performed again and again on the premise that it can never fail. <em className="not-italic">Prieta de mi Amor</em> and <em className="not-italic">El Gallo Petenero</em> mark the moments when Eitán sheds any mask: the first imagines how a piece would sound today had it arisen naturally from the psychedelic cumbia of 1970s Mexico; the second draws on <em className="not-italic">La Petenera</em>, one of the oldest sones in the Mexican repertoire, but rebuilds its deep structure from scratch in the key of norteña polka with synthesizers.
            </p>
            <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
              <strong className="font-semibold not-italic text-slate-200">Leitmotifs.</strong> <em className="not-italic">Ricercar</em>, <em className="not-italic">Fantasía</em>, <em className="not-italic">Les Sauvages</em>, and Makhaira’s show theme don’t appear only once — they return throughout the film and transform with each reappearance. <em className="not-italic">Ricercar</em> accompanies Romina’s silent conscience; <em className="not-italic">Fantasía</em> is planted early and only resolves in the film’s final revelation; <em className="not-italic">Les Sauvages</em> is the motif of the power system embodied by the senator; the show theme degrades as a ritual each time it returns. <em className="not-italic">Punto y Coma</em>, by contrast, is the deliberate exception: it translates Marcos’s gait — short and decisive, then dragging — into musical values, and sounds only once, at the exact moment the story questions the structure of the social system. It is not a motif that returns; it is a piece of metalanguage.
            </p>
            <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
              Each level of the film’s narrative world — the spectacle, the system of power, the silent conscience, the anomaly — has its own sonic register, and silence occupies the stretches where that register is the deliberate absence of musical comment: one more compositional decision, not an absence.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Column 1: Featured Tracks */}
          <div className="lg:col-span-5 flex flex-col gap-8">
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
                  onClick={() => togglePlayer(krakatoaRef.current, krakatoaPlaying, setKrakatoaPlaying)}
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

            {/* Featured Track — Comienza la función */}
            <div className="bg-[#0a0e14] p-6 sm:p-8 rounded-2xl border border-[#1a3a4a] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Discreet hidden player (audio only, no visible UI) */}
              <div className="absolute inset-0 -z-10 opacity-0 pointer-events-none" aria-hidden="true">
                <iframe
                  ref={funcionRef}
                  width="320"
                  height="180"
                  src={`https://www.youtube.com/embed/${FUNCION_VIDEO_ID}?enablejsapi=1&playsinline=1&rel=0`}
                  title="Reproductor oculto de Comienza la función"
                  allow="autoplay; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>

              {/* Cover Artwork */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
                <img
                  src={funcionCover}
                  alt="Acróbata enmascarada — fotograma de Makhaira"
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Track info */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  Comienza la función
                </h3>
              </div>

              {/* Minimalist play button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => togglePlayer(funcionRef.current, funcionPlaying, setFuncionPlaying)}
                  aria-pressed={funcionPlaying}
                  aria-label={funcionPlaying ? 'Pausar Comienza la función' : 'Reproducir Comienza la función'}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-[#a8d30d] text-[#0a0e14] hover:bg-[#b9e320] transition-colors shadow-lg shadow-[#a8d30d]/20 cursor-pointer"
                >
                  {funcionPlaying ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-0.5" fill="currentColor" />
                  )}
                </button>
              </div>

              <p className="mt-4 text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest">
                {funcionPlaying ? 'Reproduciendo…' : 'Presiona para escuchar'}
              </p>
            </div>

            {/* Featured Track — Pervert */}
            <div className="bg-[#0a0e14] p-6 sm:p-8 rounded-2xl border border-[#1a3a4a] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Cover Artwork — swaps to an autoplay YouTube iframe when playing (same container/dimensions) */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
                {pervertVideoPlaying ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${PERVERT_VIDEO_PLAY_ID}?autoplay=1&playsinline=1&rel=0`}
                    title="Pervert — video oficial"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                ) : (
                  <img
                    src={pervertCover}
                    alt="Bailarina en el antro bajo luces azules y moradas — fotograma de Makhaira"
                    className="object-cover w-full h-full"
                  />
                )}
              </div>

              {/* Track info */}
              <div className="text-center mb-6">
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  Pervert
                </h3>
              </div>

              {/* Minimalist play button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setPervertVideoPlaying((prev) => !prev)}
                  aria-pressed={pervertVideoPlaying}
                  aria-label={pervertVideoPlaying ? 'Pausar Pervert' : 'Reproducir Pervert'}
                  className="flex items-center justify-center w-16 h-16 rounded-full bg-[#a8d30d] text-[#0a0e14] hover:bg-[#b9e320] transition-colors shadow-lg shadow-[#a8d30d]/20 cursor-pointer"
                >
                  {pervertVideoPlaying ? (
                    <Pause className="w-7 h-7" fill="currentColor" />
                  ) : (
                    <Play className="w-7 h-7 ml-0.5" fill="currentColor" />
                  )}
                </button>
              </div>

              <p className="mt-4 text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest">
                {pervertVideoPlaying ? 'Reproduciendo…' : 'Presiona para escuchar'}
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
