import React from 'react';
import { Clapperboard, PenLine, Coins, Users, Music2 } from 'lucide-react';
import { motion } from 'motion/react';

interface CastGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  names: string[];
  wide?: boolean;
}

export default function Cast() {
  const groups: CastGroup[] = [
    {
      id: 'direccion',
      label: 'Dirección',
      icon: <Clapperboard className="w-4 h-4" />,
      names: ['Mauricio de la Maza-Benignos', 'Sofía Díaz Garza'],
    },
    {
      id: 'guion',
      label: 'Guión',
      icon: <PenLine className="w-4 h-4" />,
      names: ['Mauricio de la Maza-Benignos', 'Sofía Díaz Garza'],
    },
    {
      id: 'produccion',
      label: 'Producción',
      icon: <Coins className="w-4 h-4" />,
      names: ['Mauricio de la Maza-Benignos'],
    },
    {
      id: 'musica',
      label: 'Música Original',
      icon: <Music2 className="w-4 h-4" />,
      names: ['Mauricio de la Maza-Benignos'],
    },
    {
      id: 'reparto',
      label: 'Reparto Principal',
      icon: <Users className="w-4 h-4" />,
      names: [
        'Vicente Galindo',
        'Jessica Mendiolea',
        'Irlanda Gallardo',
        'Justin Pérez',
        'Mónica Muruato',
        'Sergio Quiñones',
      ],
      wide: true,
    },
  ];

  return (
    <section id="cast-section" className="py-24 relative bg-[#0a0e14] overflow-hidden border-t border-[#1a3a4a]/45">
      <div className="absolute top-[-10%] left-[-20%] w-[600px] h-[600px] rounded-full bg-[#8b0000]/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[#a8d30d]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] block font-bold">Créditos</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            REPARTO
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#4682b4] to-transparent mx-auto mt-4" />
        </div>

        {/* Credit groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className={`bg-[#0d131a]/60 border border-[#1a3a4a]/50 rounded-xl p-6 shadow-lg hover:border-[#4682b4]/40 transition-colors ${
                group.wide ? 'lg:col-span-3' : ''
              }`}
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a3a4a]/40">
                <span className="text-[#8b0000]">{group.icon}</span>
                <h3 className="font-mono text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
                  {group.label}
                </h3>
              </div>
              <ul
                className={
                  group.wide
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3'
                    : 'space-y-3'
                }
              >
                {group.names.map((name) => (
                  <li key={name} className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a8d30d] shrink-0" />
                    <span className="font-display text-base text-white tracking-wide">{name}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Secondary cast note */}
        <p className="text-center font-mono text-[11px] text-slate-500 uppercase tracking-[0.2em] mt-12">
          Reparto secundario — próximamente
        </p>
      </div>
    </section>
  );
}
