import React, { useState } from 'react';
import { Star, MessageSquare, ThumbsUp, Calendar, Quote, BadgeCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Review } from '../types';

export default function Critics() {
  const [helpfulRatings, setHelpfulRatings] = useState<Record<string, { count: number; active: boolean }>>({
    'rev-1': { count: 342, active: false },
    'rev-2': { count: 189, active: false },
    'rev-3': { count: 215, active: false },
  });

  const reviews: Review[] = [
    {
      id: 'rev-1',
      criticName: 'Esteban Valenzuela',
      publication: 'Cinéfilos de Vanguardia',
      rating: 9.5,
      maxRating: 10,
      text: 'Mauricio de la Maza teje un tapiz visual hipnótico donde la fétida bruma verde bilis y las espadas azul metálico entonan una ópera de violencia brutal. "El gran Makhaira" no es solo suspenso; es una experiencia cromática devoradora que te clava en el asiento desde los primeros minutos.',
      date: '04 de Junio, 2026',
      featured: true
    },
    {
      id: 'rev-2',
      criticName: 'Elena G. Castelar',
      publication: 'Moviola Crítica Digital',
      rating: 4.8,
      maxRating: 5,
      text: 'La banda sonora de sintetizadores modulares dialoga magistralmente con la crudeza del rojo sangre de los encuadres. Un guión tenso y cortante como el filo de la propia makhaira. El final te dejará atónito.',
      date: '06 de Junio, 2026',
      featured: false
    },
    {
      id: 'rev-3',
      criticName: 'Dimitris Papadopoulos',
      publication: 'The Hellenic Screen',
      rating: 9.0,
      maxRating: 10,
      text: 'El gran Makhaira logra casar con solidez las leyendas del Peloponeso con la crudeza de la ficción de acción criminal de hoy. Una obra maestra del cine independiente contemporáneo, bendecida con una de las selecciones fotográficas más bellas de la década.',
      date: '09 de Junio, 2026',
      featured: false
    }
  ];

  const handleHelpfulToggle = (id: string) => {
    setHelpfulRatings((prev) => {
      const item = prev[id];
      if (item.active) {
        return {
          ...prev,
          [id]: { count: item.count - 1, active: false }
        };
      } else {
        return {
          ...prev,
          [id]: { count: item.count + 1, active: true }
        };
      }
    });
  };

  return (
    <section id="critics-section" className="py-24 relative bg-[#0a0e14] overflow-hidden border-t border-[#1a3a4a]/45">
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-[#8b0000]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#a8d30d]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] block font-bold">Recepción Crítica</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            LA CRÍTICA HA SOCARRADO
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#4682b4] to-transparent mx-auto mt-4" />
        </div>

        {/* Bento Board: Stat highlights and reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stat panel: Left */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0d131a] p-8 rounded-2xl border border-[#1a3a4a] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#a8d30d]/10 to-transparent pointer-events-none" />
              
              <div className="space-y-4">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#4682b4] block font-bold">Puntaje Consolidado</span>
                
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-6xl font-black text-white">9.3</span>
                  <span className="font-mono text-xs text-[#a8d30d] font-bold">/10 MEDIA</span>
                </div>

                <div className="flex gap-1 text-[#8b0000]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed font-sans pt-2">
                  Aclamada universalmente por críticos iberoamericanos de vanguardia como "una de las películas con mejor composición estilística sonora de 2026."
                </p>
              </div>

              {/* Accolades checklist */}
              <div className="mt-8 pt-6 border-t border-[#1a3a4a]/40 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <BadgeCheck className="w-4 h-4 text-[#a8d30d]" />
                  <span>Selección Crítica Oficial de Cannes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <BadgeCheck className="w-4 h-4 text-[#a8d30d]" />
                  <span>Mejor Dirección de Arte - Morelia</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <BadgeCheck className="w-4 h-4 text-[#a8d30d]" />
                  <span>Nominación Mejor Música Original</span>
                </div>
              </div>
            </div>

            {/* Quote of the film */}
            <div className="bg-gradient-to-br from-[#0a0e14] via-[#0d131a] to-[#8b0000]/10 p-6 rounded-xl border border-[#8b0000]/20 text-slate-200 font-display [font-variant:small-caps] tracking-wider text-xs leading-relaxed relative font-medium">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-slate-900 pointer-events-none" />
              "En El gran Makhaira todo es filoso, la niebla no oculta los pecados y la verdad, tarde o temprano, dibuja un tajo imborrable en la garganta del traidor."
            </div>
          </div>

          {/* Review Grid: Right */}
          <div className="lg:col-span-8 space-y-6">
            {reviews.map((review) => {
              const helpfulState = helpfulRatings[review.id] || { count: 0, active: false };

              return (
                <div
                  key={review.id}
                  className={`p-8 bg-[#0d131a] rounded-2xl border transition-all duration-300 relative ${
                    review.featured
                      ? 'border-[#a8d30d]/30 shadow-lg shadow-[#a8d30d]/5'
                      : 'border-[#1a3a4a]/45 hover:border-[#4682b4]/30'
                  }`}
                >
                  {review.featured && (
                    <span className="absolute -top-3 left-6 font-mono text-[9px] uppercase tracking-widest bg-[#a8d30d] text-black px-2.5 py-1 rounded font-bold">
                      Reseña Destacada
                    </span>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h4 className="font-display font-bold text-white text-lg tracking-wide">
                        {review.criticName}
                      </h4>
                      <p className="font-mono text-xs text-[#4682b4] font-bold">
                        {review.publication}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 self-start md:self-auto">
                      <span className="font-mono text-xs text-slate-500">{review.date}</span>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#8b0000]/20 rounded border border-[#8b0000]/45">
                        <Star className="w-3.5 h-3.5 text-[#8b0000] fill-current" />
                        <span className="font-mono text-xs text-white font-bold">
                          {review.rating.toFixed(1)}/{review.maxRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-200 text-sm leading-relaxed mb-6 font-display tracking-wide font-normal animate-flicker">
                    "{review.text}"
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-[#1a3a4a]/30 text-xs font-mono text-slate-500">
                    <button
                      onClick={() => handleHelpfulToggle(review.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                        helpfulState.active
                          ? 'bg-[#a8d30d]/20 border border-[#a8d30d]/50 text-white font-bold'
                          : 'hover:bg-[#0a0e14] hover:text-slate-300'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${helpfulState.active ? 'text-[#a8d30d]' : ''}`} />
                      <span>¿Útil? ({helpfulState.count})</span>
                    </button>

                    <span className="text-[10px] uppercase tracking-widest text-slate-600 flex items-center gap-1 font-bold">
                      <MessageSquare className="w-3.5 h-3.5 text-[#4682b4]" /> CRÍTICA VERIFICADA
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
