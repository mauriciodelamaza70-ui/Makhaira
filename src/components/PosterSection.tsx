import React, { useState } from 'react';
import { Play, Tv } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import the official movie poster asset
import moviePoster from '../assets/images/poster_makhaira_official.png';

export default function PosterSection() {
  const [revealTrailer, setRevealTrailer] = useState(false);

  return (
    <section id="poster-section" className="py-24 relative overflow-hidden bg-[#0a0e14] border-t border-[#1a3a4a]/45">
      {/* Background Gradients & Ambient Mist */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#a8d30d]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8b0000]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] font-bold">Galería</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            Arte
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-[#a8d30d] via-[#4682b4] to-[#8b0000] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Interactive Movie Lightbox Poster */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center">
            <div className="relative group">
              {/* Outer Glowing Neon Borders */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#8b0000] via-[#4682b4] to-[#a8d30d] rounded-2xl opacity-75 blur-md group-hover:opacity-100 transition duration-500 group-hover:blur-lg" />
              
              {/* Cine Lightbox Frame */}
              <div className="relative bg-[#0d131a] p-4 rounded-xl border border-[#1a3a4a] shadow-2xl">
                <div className="relative overflow-hidden rounded-lg aspect-[3/4] w-[320px] sm:w-[380px] bg-black">
                  <img
                    src={moviePoster}
                    alt="Póster Oficial El gran Makhaira"
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transform transition-all duration-1000 group-hover:scale-105 animate-flicker"
                  />
                  {/* Neon Hue overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d131a] via-transparent to-[#a8d30d]/10 mix-blend-overlay opacity-60 pointer-events-none" />
                  
                  {/* Hover banner details */}
                  <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6">
                    <div className="border-l-2 border-[#a8d30d] pl-3 py-1">
                      <span className="font-mono text-[10px] text-[#a8d30d] uppercase tracking-widest block font-bold">FICHA TÉCNICA</span>
                      <strong className="font-display text-lg tracking-wider text-white">EL GRAN MAKHAIRA</strong>
                    </div>
                    
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 font-mono">
                        <span className="text-slate-500">DIRECTOR:</span> Mauricio de la Maza<br />
                        <span className="text-slate-500">PAÍS:</span> México / Grecia<br />
                        <span className="text-slate-500">GÉNERO:</span> Thriller Filosófico, Neo-Noir<br />
                        <span className="text-slate-500">DURACIÓN:</span> 124 min
                      </p>
                      <button 
                        onClick={() => setRevealTrailer(true)}
                        className="w-full py-2.5 bg-[#8b0000] hover:bg-[#a8d30d] text-white hover:text-black font-mono text-xs uppercase tracking-widest font-bold transition-all rounded flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Ver Teaser Clip
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Synopsis and Streaming Gateways */}
          <div className="lg:col-span-12 xl:col-span-7 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4682b4]/10 border border-[#4682b4]/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#4682b4]" />
                <span className="font-display font-bold text-[11px] text-[#4682b4] tracking-[0.2em] uppercase [font-variant:small-caps]">Sinopsis Oficial</span>
              </div>
              
              {/* Bloque en Español */}
              <div className="space-y-4 text-left md:text-justify pr-2">
                <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
                  En un circo underground donde la violencia y el morbo forman parte del espectáculo, Eitán, un célebre lanzador de cuchillos, parece dominar cada aspecto de su mundo. Bajo las luces de la carpa, el público celebra el riesgo, la humillación y el peligro como si fueran simples formas de entretenimiento.
                </p>
                <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
                  A su alrededor, artistas, amantes y espectadores quedan atrapados en una red de dependencia, deseo y abuso, donde las fronteras entre el escenario y la vida cotidiana se vuelven cada vez más difusas. Mientras las tensiones crecen y las relaciones se desgastan, el espectáculo exige siempre algo más: más riesgo, más dolor, más fascinación.
                </p>
                <p className="font-serif-elegant text-[#e0e0e0] text-sm sm:text-base leading-relaxed">
                  Oscura, provocadora e inquietante, <span className="font-semibold text-white">“El Gran Makhaira”</span> explora las dinámicas del poder, la responsabilidad moral y la atracción humana por la crueldad. Una historia sobre aquello que elegimos admirar, aquello que decidimos ignorar y el precio que otros terminan pagando por nuestro entretenimiento.
                </p>
              </div>

              {/* Divisor Elegante */}
              <div className="flex items-center gap-4 py-2">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1a3a4a] via-[#4682b4]/30 to-transparent" />
                <span className="font-display font-medium text-[9px] uppercase tracking-[0.3em] text-[#4682b4]">English Translation</span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-[#1a3a4a] via-[#4682b4]/30 to-transparent" />
              </div>

              {/* Bloque en Inglés */}
              <div className="space-y-4 text-left md:text-justify pr-2 italic">
                <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
                  In an underground circus where violence and voyeurism are part of the act, Eitán, a celebrated knife thrower, appears to command every aspect of his world. Beneath the glare of the spotlight, audiences cheer for danger, humiliation, and spectacle as if they were harmless forms of entertainment.
                </p>
                <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
                  Around him, performers, lovers, and spectators become entangled in a web of dependence, desire, and abuse, where the boundaries between performance and everyday life grow increasingly blurred. As tensions rise and relationships begin to fracture, the show demands ever more: more risk, more pain, more fascination.
                </p>
                <p className="font-serif-elegant text-[#b0b0b0] text-xs sm:text-sm leading-relaxed">
                  Dark, provocative, and unsettling, <span className="font-semibold text-slate-200">The Great Makhaira</span> explores the dynamics of power, moral responsibility, and humanity’s attraction to cruelty. A story about what we choose to admire, what we decide to ignore, and the price others ultimately pay for our entertainment.
                </p>
              </div>
            </div>

            {/* Streaming availability */}
            <div className="space-y-4">
              <div className="flex items-center border-b border-[#1a3a4a]/40 pb-2">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#8b0000]" />
                  Canales de Streaming Oficial
                </h4>
              </div>

              <div className="flex items-center gap-3 bg-[#0d131a]/50 border border-[#1a3a4a]/50 rounded-xl p-5 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#a8d30d] shrink-0" />
                <p className="font-mono text-sm text-slate-300 uppercase tracking-widest">
                  Próximamente disponible en streaming
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Teaser Trailer Modal */}
      <AnimatePresence>
        {revealTrailer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setRevealTrailer(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d131a] border border-[#1a3a4a] p-2 rounded-2xl max-w-4xl w-full aspect-video shadow-2xl relative flex flex-col justify-between animate-glow"
            >
              {/* Simulation of a premium cinematic video player */}
              <div className="relative flex-1 bg-black rounded-lg overflow-hidden flex flex-col justify-center items-center p-8 text-center group">
                <div className="absolute inset-0 bg-[#a8d30d]/5 mix-blend-color opacity-30 pointer-events-none" />
                
                {/* Overlay visual noise and scanner lines */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

                <div className="relative z-10 space-y-4">
                  <div className="inline-flex p-4 rounded-full bg-[#8b0000]/15 border border-[#8b0000]/40 text-[#8b0000] animate-pulse">
                    <Play className="w-8 h-8 fill-current" />
                  </div>
                  <h4 className="font-display font-black text-2xl tracking-[0.25em] text-white">TEASER TRAILER EN EXCLUSIVA</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto font-sans">
                    La bruma del arroyo se desvanece... El filo curvo del makhaira aguarda sediento de venganza. Estreno en salas seleccionadas el próximo Otoño.
                  </p>
                  
                  {/* Fake progress bar */}
                  <div className="w-64 h-1 bg-slate-900 rounded-full mx-auto relative overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 bottom-0 left-0 bg-[#a8d30d]" 
                    />
                  </div>
                </div>

                {/* Bottom player bar controls mock */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-slate-500 font-mono text-[9px]">
                  <span>VEO PRODUCTION CORP / TEASER CLIP 01</span>
                  <span>TIME [0:12 / 1:45] REGION: LATAM</span>
                </div>
              </div>

              <div className="flex justify-end pt-2 pb-1 px-2">
                <button
                  onClick={() => setRevealTrailer(false)}
                  className="font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-white px-4 py-1 hover:bg-[#0a0e14] rounded transition-all cursor-pointer"
                >
                  Cerrar Reproductor
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
