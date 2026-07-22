import React, { useState, useEffect } from 'react';
import { Film, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const menuItems = [
    { name: 'Portada', id: 'hero' },
    { name: 'El Póster', id: 'poster-section' },
    { name: 'Detrás de Escena', id: 'photography-section' },
    { name: 'Reparto', id: 'cast-section' },
    { name: 'Banda Sonora', id: 'soundtrack-section' },
  ];

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0d131a]/90 backdrop-blur-md border-b border-[#4682b4]/20 py-3 shadow-lg shadow-black/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full px-3 sm:px-5 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => scrollToSection('hero')}
            >
              <div className="relative">
                <Film className="w-6 h-6 text-[#a8d30d] group-hover:text-white transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#8b0000] rounded-full animate-pulseUnique" />
              </div>
              <span className="font-display tracking-[0.2em] text-lg font-bold bg-gradient-to-r from-white via-[#4682b4] to-white bg-clip-text text-transparent group-hover:from-[#a8d30d] group-hover:to-[#8b0000] transition-all duration-500">
                MAKHAIRA
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-display text-[11px] uppercase tracking-[0.25em] text-slate-300 hover:text-[#a8d30d] transition-colors duration-300 relative py-2 group cursor-pointer font-bold [font-variant:small-caps] font-cinzel-forced"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#4682b4] to-[#a8d30d] group-hover:w-full transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* CTA Ticket Button */}
            <div className="hidden md:flex items-center space-x-4">
              <span className="inline-flex items-center text-[10px] font-display uppercase tracking-[0.15em] text-[#a8d30d]/80 bg-[#a8d30d]/10 px-2.5 py-1 rounded border border-[#a8d30d]/20 animate-flicker font-bold [font-variant:small-caps]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a8d30d] mr-2 animate-ping" />
                Estreno Mundial
              </span>
              <button
                onClick={() => scrollToSection('trailer-section')}
                className="font-display text-[11px] uppercase tracking-[0.15em] bg-gradient-to-r from-[#8b0000] to-red-900 hover:from-[#8b0000] hover:to-[#a8d30d] hover:text-black text-white px-5 py-2.5 rounded border border-[#8b0000]/40 transition-all duration-500 shadow-md shadow-red-950/40 font-bold flex items-center gap-1 cursor-pointer [font-variant:small-caps] font-cinzel-forced"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                Próximamente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile menu trigger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-300 hover:text-[#a8d30d] transition-colors p-2"
                aria-label="Abrir menú"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0d131a]/98 backdrop-blur-lg pt-24 px-6 md:hidden flex flex-col justify-start"
          >
            <div className="space-y-6 flex flex-col items-center">
              {menuItems.map((item, index) => (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="font-display tracking-[0.2em] text-xl font-bold text-slate-200 hover:text-[#a8d30d] transition-all py-3 font-cinzel-forced"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  {item.name}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-[1px] bg-[#4682b4]/20 my-4"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="text-center w-full"
              >
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#a8d30d] mb-3 animate-pulse">
                  Makhaira está listo para cortar
                </p>
                <button
                  onClick={() => scrollToSection('trailer-section')}
                  className="font-display text-xs uppercase tracking-widest bg-gradient-to-r from-[#8b0000] to-red-900 text-white px-8 py-3.5 rounded border border-[#8b0000]/40 font-bold shadow-lg w-full flex justify-center items-center gap-2 hover:from-[#8b0000] hover:to-[#a8d30d] hover:text-black transition-all font-cinzel-forced"
                  style={{ fontFamily: '"Cinzel", serif' }}
                >
                  Próximamente
                  <ChevronRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
