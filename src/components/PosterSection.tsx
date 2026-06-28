import React, { useState, useEffect } from 'react';
import { Play, Tv, ArrowUpRight, ShieldCheck, HelpCircle, Eye, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { StreamingPlatform } from '../types';

// Import our custom-generated movie poster asset
import moviePoster from '../assets/images/movie_poster_1781135351005.png';

export default function PosterSection() {
  const [redirectingPlatform, setRedirectingPlatform] = useState<StreamingPlatform | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [revealTrailer, setRevealTrailer] = useState(false);

  const platforms: StreamingPlatform[] = [
    {
      id: 'netflix',
      name: 'Netflix',
      url: 'https://netflix.com',
      logoType: 'netflix',
      availabilityText: 'Disponible en Ultra HD 4K',
      priceType: 'Suscripción Premium'
    },
    {
      id: 'amazon',
      name: 'Prime Video',
      url: 'https://primevideo.com',
      logoType: 'amazon',
      availabilityText: 'Compra o Renta Digital',
      priceType: 'Gratis con Prime'
    },
    {
      id: 'apple',
      name: 'Apple TV',
      url: 'https://tv.apple.com',
      logoType: 'apple',
      availabilityText: 'HDR & Atmos Soportado',
      priceType: 'Compra Digital / Renta'
    },
    {
      id: 'mubi',
      name: 'MUBI',
      url: 'https://mubi.com',
      logoType: 'mubi',
      availabilityText: 'Selección de Directores',
      priceType: 'Suscripción Independiente'
    },
    {
      id: 'shudder',
      name: 'Shudder',
      url: 'https://shudder.com',
      logoType: 'shudder',
      availabilityText: 'Exclusivo Thriller & Suspenso',
      priceType: 'Suscripción de Terror'
    }
  ];

  useEffect(() => {
    let timer: any;
    if (redirectingPlatform && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (redirectingPlatform && countdown === 0) {
      // Simulate real redirection by opening in new tab
      window.open(redirectingPlatform.url, '_blank', 'noopener,noreferrer');
      setRedirectingPlatform(null);
      setCountdown(3);
    }
    return () => clearTimeout(timer);
  }, [redirectingPlatform, countdown]);

  const handlePlatformClick = (platform: StreamingPlatform) => {
    setRedirectingPlatform(platform);
    setCountdown(3);
  };

  const cancelRedirection = () => {
    setRedirectingPlatform(null);
    setCountdown(3);
  };

  return (
    <section id="poster-section" className="py-24 relative overflow-hidden bg-[#0a0e14] border-t border-[#1a3a4a]/45">
      {/* Background Gradients & Ambient Mist */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#a8d30d]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#8b0000]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] font-bold">Exhibición Global</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            EL PÓSTER Y LOGO OFICIAL
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
                
                {/* Lightbox status bar */}
                <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-slate-500 px-1 border-t border-[#1a3a4a]/40 pt-2.5 strain">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8d30d] animate-ping" />
                    <span className="capitalize">IMAX DIGITAL</span>
                  </div>
                  <div>Nº ID: MAK-2026</div>
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

            {/* Streaming redirection portal */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1a3a4a]/40 pb-2">
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tv className="w-4 h-4 text-[#8b0000]" />
                  Canales de Streaming Oficial
                </h4>
                <span className="text-[10px] font-mono text-[#a8d30d] bg-[#a8d30d]/10 border border-[#a8d30d]/20 px-2 py-0.5 rounded font-bold">
                  BOLETOS DISPONIBLES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {platforms.map((platform) => (
                  <div
                    key={platform.id}
                    onClick={() => handlePlatformClick(platform)}
                    className="group relative overflow-hidden bg-[#0d131a]/50 hover:bg-[#0a0e14] border border-[#1a3a4a]/50 hover:border-[#4682b4]/50 rounded-xl p-4 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-black/60 flex items-center justify-between"
                  >
                    {/* Hover indicator lines */}
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#8b0000] opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-1 z-10">
                      <span className="font-display font-black text-lg tracking-wider text-white group-hover:text-[#a8d30d] transition-colors">
                        {platform.name}
                      </span>
                      <p className="text-[10px] font-mono text-slate-400">{platform.availabilityText}</p>
                      <p className="text-[9px] font-mono text-[#4682b4] uppercase tracking-wider">{platform.priceType}</p>
                    </div>

                    <div className="p-2 bg-slate-950/80 rounded-lg group-hover:bg-[#8b0000]/10 border border-slate-800/80 transition-colors z-10">
                      <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-[#8b0000] transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Extra production notice */}
            <div className="flex gap-4 p-4 rounded-xl bg-[#0a0e14]/40 border border-[#1a3a4a]/40 text-slate-400 text-xs shadow-inner">
              <Info className="w-5 h-5 text-[#8b0000] shrink-0 animate-bounce" />
              <p>
                Al hacer clic en las plataformas, se generará vuestros accesos de pre-compra cifrados integrando código de visualización. Válido en toda Hispanoamérica y Grecia.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Redirection Gateway Modal Overlay */}
      <AnimatePresence>
        {redirectingPlatform && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              className="bg-[#0d131a] border border-[#8b0000]/40 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden text-center"
            >
              {/* Abstract decorative beam */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#ffd32a00] via-[#a8d30d] to-[#ffd32a00]" />

              <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                {/* Loader track animation */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="#1e293b"
                    strokeWidth="3"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="34"
                    stroke="#a8d30d"
                    strokeWidth="3.5"
                    fill="transparent"
                    strokeDasharray="213"
                    initial={{ strokeDashoffset: 213 }}
                    animate={{ strokeDashoffset: 213 - (213 * (3 - countdown)) / 3 }}
                    transition={{ ease: 'linear', duration: 1 }}
                  />
                </svg>
                <span className="absolute font-mono text-2xl font-bold text-white">
                  {countdown}
                </span>
              </div>

              <span className="inline-block px-3 py-1 bg-[#a8d30d]/10 border border-[#a8d30d]/30 text-[#a8d30d] font-mono text-[9px] uppercase tracking-widest mb-4">
                Pasarela de Distribución
              </span>

              <h3 className="font-display text-xl text-white font-bold tracking-wider mb-2">
                REDIRECCIÓN EN PROCESO
              </h3>
              
              <p className="text-xs text-slate-400 mb-6">
                Preparando conexión segura con <strong className="text-white font-mono">{redirectingPlatform.name}</strong> para ver <strong className="text-[#4682b4]">El gran Makhaira</strong>.
              </p>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    window.open(redirectingPlatform.url, '_blank', 'noopener,noreferrer');
                    setRedirectingPlatform(null);
                  }}
                  className="font-mono text-[11px] uppercase tracking-widest text-[#0d131a] bg-white hover:bg-[#a8d30d] font-bold py-2.5 rounded transition-colors w-full cursor-pointer"
                >
                  Saltar Espera Ahora
                </button>
                <button
                  onClick={cancelRedirection}
                  className="font-mono text-[11px] uppercase tracking-widest text-[#8b0000] hover:text-white py-1.5 transition-colors cursor-pointer"
                >
                  Cancelar Redirección
                </button>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-[9px] font-mono text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4682b4]" />
                Enlace de taquilla oficial certificado
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
