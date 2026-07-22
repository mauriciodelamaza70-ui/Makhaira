import React from 'react';
import { Film, Radio, Shield, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080c] text-slate-400 py-16 border-t border-[#4a7ba5]/15 relative overflow-hidden">
      {/* Absolute Bottom Ambient glow */}
      <div className="absolute bottom-0 left-[50%] -translate-x-[50%] w-[1000px] h-[100px] rounded-full bg-[#ff1e1e]/5 blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand/Slogan Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={handleBackToTop}>
              <Film className="w-5 h-5 text-[#8af542]" />
              <span className="font-display tracking-[0.25em] text-md font-bold text-white">
                EL GRAN MAKHAIRA
              </span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Una co-producción cinematográfica independiente griega-iberoamericana. Rodada íntegramente en locaciones de Grecia y los valles fríos de Morelia.
            </p>

            <blockquote className="border-l-2 border-[#ff1e1e] pl-3 py-1 italic font-display text-xs text-slate-300">
              "Makhaira nunca falla."
            </blockquote>
          </div>

          {/* Quick legal links */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#4a7ba5] font-bold">Distribución</h4>
            <ul className="space-y-1.5 text-xs text-slate-400 font-mono">
              <li><a href="https://mauriciodelamazabenignos.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Prensa & Screeners</a></li>
              <li><a href="https://mauriciodelamazabenignos.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Requisitos de Exhibición</a></li>
              <li><a href="https://mauriciodelamazabenignos.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Ventas Internacionales</a></li>
              <li><a href="https://mauriciodelamazabenignos.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors cursor-pointer">Contacto de Prensa</a></li>
            </ul>
          </div>

          {/* Technical credits */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-widest text-[#ff1e1e] font-bold">Producción</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Un film de: <strong className="text-white">Mauricio de la Maza-Benignos</strong><br />
              Dirigido por: <strong className="text-white">Mauricio de la Maza-Benignos y Sofía Díaz Garza</strong><br />
              Dirección de Fotografía: <strong className="text-white">Mauricio de la Maza-Benignos</strong><br />
              Compositor / Banda Sonora: <strong className="text-white">Mauricio de la Maza-Benignos</strong><br />
              Producción: <strong className="text-white">De la Maza Consulting & Films</strong>
            </p>
          </div>

        </div>

        {/* Closing details bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>
            <span>© {currentYear} VEO PRODUCTION CORP. TODOS LOS DERECHOS RESERVADOS.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 hover:text-[#8af542] transition-colors cursor-pointer" onClick={handleBackToTop}>
              <Globe className="w-4 h-4 text-slate-700" />
              <span>Volver arriba</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-slate-700" />
              <span>Clasificación: R [18+]</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
