import React from 'react';
import { Clapperboard, PenLine, Coins, Users, Music2 } from 'lucide-react';
import { motion } from 'motion/react';

// Principal cast portraits — imported in upload order (cast_01 … cast_12).
// Each portrait is associated with the actor/character listed at the same
// position in the client's numbered list. To re-map a face, just change the
// `photo` reference on the matching entry below.
import cast01 from '../assets/images/cast_01.png';
import cast02 from '../assets/images/cast_02.png';
import cast03 from '../assets/images/cast_03.png';
import cast04 from '../assets/images/cast_04.png';
import cast05 from '../assets/images/cast_05.png';
import cast06 from '../assets/images/cast_06.png';
import cast07 from '../assets/images/cast_07.png';
import cast08 from '../assets/images/cast_08.png';
import cast09 from '../assets/images/cast_09.png';
import cast10 from '../assets/images/cast_10.png';
import cast11 from '../assets/images/cast_11.png';
import cast12 from '../assets/images/cast_12.png';
import cast13 from '../assets/images/cast_13.png';
import cast14 from '../assets/images/cast_14.png';
import cast15 from '../assets/images/cast_15.png';
import cast16 from '../assets/images/cast_16.png';

interface CreditGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  names: string[];
}

interface CastMember {
  actor: string;
  character: string;
  photo: string;
  // Optional CSS object-position to fine-tune face framing within the 3:4 crop.
  objectPosition?: string;
}

export default function Cast() {
  const creditGroups: CreditGroup[] = [
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
  ];

  // Photos matched by VISUAL IDENTITY (not upload order), per the client's
  // detailed descriptions of each frame.
  const principalCast: CastMember[] = [
    { actor: 'Jessica Mendiolea', character: 'Romina', photo: cast10 },
    { actor: 'Vicente Galindo', character: 'Makhaira', photo: cast03 },
    { actor: 'Irlanda Gallardo', character: 'Magda', photo: cast02, objectPosition: 'center 25%' },
    { actor: 'Justin Pérez', character: 'Lucas', photo: cast05 },
    { actor: 'Grecia Meza', character: 'Mesalina', photo: cast01 },
    { actor: 'Mónica Muruato', character: 'Paula', photo: cast12, objectPosition: '70% center' },
    { actor: 'Oscar Alvizo', character: 'Punto y Coma', photo: cast08 },
    { actor: 'Amelie Flores', character: 'Esclava de Mesalina', photo: cast04 },
    { actor: 'Ricky Rojas', character: 'Onán', photo: cast11 },
    { actor: 'Lorena Treviño', character: 'Katrina', photo: cast09, objectPosition: '62% center' },
    { actor: 'Sergio Quiñones', character: 'El senador', photo: cast06, objectPosition: '75% center' },
    { actor: 'Andrea Patrone', character: 'Anatolia', photo: cast07 },
    { actor: 'Edna Rayna Agundis', character: 'La mujer de la noche', photo: cast14, objectPosition: '30% center' },
    { actor: 'Erick Garza Morales', character: 'El empresario', photo: cast13, objectPosition: '62% center' },
    { actor: 'Oscar Tamez', character: 'Benjamín', photo: cast15 },
    { actor: 'Luis Ángel Rivera', character: 'Aarón', photo: cast16 },
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

        {/* Principal cast — character portraits */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#1a3a4a]/40">
            <span className="text-[#8b0000]"><Users className="w-4 h-4" /></span>
            <h3 className="font-mono text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
              Reparto Principal
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {principalCast.map((member, index) => (
              <motion.figure
                key={member.actor}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
                className="group bg-[#0d131a]/60 border border-[#1a3a4a]/50 rounded-xl overflow-hidden shadow-lg hover:border-[#4682b4]/50 transition-colors"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={member.photo}
                    alt={`${member.actor} como ${member.character}`}
                    loading="lazy"
                    decoding="async"
                    style={{ objectPosition: member.objectPosition ?? 'center' }}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e14] via-transparent to-transparent opacity-80 pointer-events-none" />
                </div>
                <figcaption className="p-4 text-center">
                  <span className="block font-display text-base text-white tracking-wide leading-tight text-balance">
                    {member.actor}
                  </span>
                  <span className="block font-mono text-[11px] text-[#a8d30d] uppercase tracking-[0.15em] mt-1.5">
                    como {member.character}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>

        {/* Crew credit groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {creditGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="bg-[#0d131a]/60 border border-[#1a3a4a]/50 rounded-xl p-6 shadow-lg hover:border-[#4682b4]/40 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1a3a4a]/40">
                <span className="text-[#8b0000]">{group.icon}</span>
                <h3 className="font-mono text-xs text-slate-400 uppercase tracking-[0.2em] font-bold">
                  {group.label}
                </h3>
              </div>
              <ul className="space-y-3">
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
