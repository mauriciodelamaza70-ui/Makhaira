import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, ChevronDown, MonitorPlay, Sparkles, VolumeX, AlertTriangle, ArrowRight } from 'lucide-react';

// Import our modular cinema landing page components
import Header from './components/Header';
import PosterSection from './components/PosterSection';
import TrailerSection from './components/TrailerSection';
import BehindScenes from './components/BehindScenes';
import Critics from './components/Critics';
import AudienceLedger from './components/AudienceLedger';
import Soundtrack from './components/Soundtrack';
import Footer from './components/Footer';

// Import our film still to act as the massive backdrop
import heroBackdrop from './assets/images/film_still_1781135393920.png';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [mutedAlert, setMutedAlert] = useState(true);

  // Cinematic Intro Sequence Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroFinished(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const handleHeroScroll = () => {
    const element = document.getElementById('poster-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="makhaira-app" className="bg-[#0d131a] min-h-screen text-slate-100 flex flex-col font-sans relative antialiased selection:bg-[#8b0000] selection:text-white">
      
      {/* Intro cinematic loader overlay */}
      <AnimatePresence>
        {!introFinished && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 2.4, ease: 'easeInOut' }}
                className="space-y-4"
              >
                <div className="flex justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a8d30d] animate-ping mr-2" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#a8d30d] font-bold">
                    VEO PICTURES S.A.
                  </span>
                </div>
                
                <h1 className="font-display text-2xl md:text-3xl font-black text-white tracking-[0.3em] uppercase">
                  PRESENTA
                </h1>
                
                <div className="h-[1px] w-12 bg-slate-800 mx-auto" />
                
                <p className="font-mono text-xs text-slate-500 tracking-wider">
                  UNA EXPERIENCIA DE MAURICIO DE LA MAZA
                </p>
              </motion.div>
            </div>
            
            {/* Aspect frame borders to give cinema bars during load */}
            <div className="absolute top-0 left-0 right-0 h-[10vh] bg-neutral-950 border-b border-zinc-900" />
            <div className="absolute bottom-0 left-0 right-0 h-[10vh] bg-neutral-950 border-t border-zinc-900" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col"
          >
            {/* Header fixed navigation bar */}
            <Header />

            {/* Cinematic Hero Segment */}
            <section
              id="hero"
              className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-black"
            >
              {/* Parallax-style giant blurred backdrop of the character under blue lights and green fog */}
              <div className="absolute inset-0 z-0">
                <img
                  src={heroBackdrop}
                  alt="Encuadre dramático de El gran Makhaira"
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full opacity-45 scale-105 filter saturate-[0.85] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d131a] via-[#0d131a]/50 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d131a] via-transparent to-[#0d131a] pointer-events-none" />
              </div>

              {/* Ambient visual dust particles and fog simulation (exact theme coloring) */}
              <div className="absolute top-1/4 left-10 w-[300px] h-[300px] rounded-full bg-[#a8d30d]/5 blur-[120px] mix-blend-color pointer-events-none" />
              <div className="absolute bottom-1/4 right-10 w-[300px] h-[300px] rounded-full bg-[#8b0000]/5 blur-[120px] mix-blend-color pointer-events-none" />

              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-10">
                {/* Release stamp */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0a0e14]/80 backdrop-blur-md border border-[#1a3a4a] rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#8b0000] animate-ping" />
                  <span className="font-mono text-[10px] text-slate-300 tracking-widest uppercase">
                    SELECCIÓN OFICIAL • PRÓXIMAMENTE EN STREAMING
                  </span>
                </div>

                {/* Massive Title display with premium font face */}
                <div className="space-y-8 py-6 flex flex-col items-center justify-center">
                  <span className="font-display text-xs sm:text-sm uppercase tracking-[0.45em] text-[#a8d30d] block animate-flicker font-bold mb-6 pb-2 border-b border-[#a8d30d]/20 [font-variant:small-caps] select-none" style={{ fontFamily: '"Cinzel", serif' }}>
                    DE LA MAZA CONSULTING & FILMS PRESENTA
                  </span>
                  
                  <h1 
                    className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-widest uppercase leading-tight font-cinzel-forced text-center flex flex-col items-center justify-center select-none"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    <span className="gold-chiseled-title">EL GRAN</span>
                    <span className="gold-chiseled-title mt-2 sm:mt-4">MAKHAIRA</span>
                  </h1>

                  {/* Aesthetic typography details (Grave theme tagline) */}
                  <div className="w-16 h-[1.5px] bg-[#8b0000] mx-auto my-6" />
                  <p 
                    className="font-display italic text-slate-350 text-xs sm:text-sm md:text-base tracking-wider max-w-4xl mx-auto font-cinzel-forced font-medium text-center leading-relaxed"
                    style={{ fontFamily: '"Cinzel", serif' }}
                  >
                    "En un circo donde el morbo es rey, el poder se oculta a plena vista. / In a circus where morbid curiosity reigns, power hides in plain sight."
                  </p>
                </div>

                {/* Main Action buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleHeroScroll}
                    className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest font-bold bg-[#8b0000] hover:bg-[#a8d30d] hover:text-black hover:scale-105 active:scale-95 text-white px-8 py-4 rounded border border-[#1a3a4a] transition-all duration-300 shadow-lg shadow-red-950/20 flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <MonitorPlay className="w-4 h-4 fill-current" />
                    Plataformas de Estreno
                  </button>
                  
                  <button
                    onClick={() => {
                      const audioSec = document.getElementById('soundtrack-section');
                      if (audioSec) audioSec.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto font-mono text-xs uppercase tracking-widest font-bold bg-transparent text-slate-200 hover:text-white px-8 py-4 rounded border border-slate-800 hover:border-[#4682b4] hover:bg-slate-900/50 transition-all duration-300 flex justify-center items-center gap-2 cursor-pointer"
                  >
                    <span>Escuchar Banda Sonora</span>
                    <ArrowRight className="w-4 h-4 text-[#4682b4]" />
                  </button>
                </div>

                {/* Scroll Down interactive guidance */}
                <div className="pt-8">
                  <button
                    onClick={handleHeroScroll}
                    className="inline-flex flex-col items-center gap-2 text-slate-500 hover:text-[#a8d30d] transition-colors"
                    aria-label="Desplazarse hacia abajo"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Entrar al film</span>
                    <ChevronDown className="w-4 h-4 animate-bounce" />
                  </button>
                </div>
              </div>

              {/* Volume notification warning */}
              {mutedAlert && (
                <div className="absolute bottom-4 right-4 z-20 max-w-xs bg-[#0a0e14]/90 border border-[#1a3a4a] rounded-lg p-3 text-[10px] font-mono text-slate-400 shadow-xl flex items-center justify-between gap-3 animate-flicker">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#a8d30d] shrink-0" />
                    <p>Esta página cuenta con síntesis de sonido procedural analógica en la sección de música.</p>
                  </div>
                  <button 
                    onClick={() => setMutedAlert(false)}
                    className="text-[#8b0000] font-bold p-1 hover:text-white transition-colors cursor-pointer"
                  >
                    ENTENDIDO
                  </button>
                </div>
              )}
            </section>

            {/* Poster & Streaming Outlets segment */}
            <PosterSection />

            {/* Official Trailer segment */}
            <TrailerSection />

            {/* Photography & Behind the scenes segment */}
            <BehindScenes />

            {/* Critic's Reviews segment */}
            <Critics />

            {/* Real-time Audience Expectancy and ledger segment (Firebase powered) */}
            <AudienceLedger />

            {/* Sound Synthesizer & Soundtrack segment */}
            <Soundtrack />

            {/* Footer segment */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
