import React, { useState } from 'react';
import { Camera, Eye, X, ZoomIn, Info, Calendar, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import our custom-generated images
import behindScenes1 from '../assets/images/behind_scenes_1_1781135364942.png';
import filmStill from '../assets/images/film_still_1781135393920.png';

interface GalleryAsset {
  id: string;
  title: string;
  category: 'behind' | 'still';
  categoryLabel: 'Detrás de Escena' | 'Imagen de la Película';
  imageSrc: string;
  description: string;
  technicalInfo: {
    camera: string;
    lens: string;
    settings: string;
  };
  narrativeText: string;
}

export default function BehindScenes() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'behind' | 'still'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryAsset | null>(null);

  const galleryItems: GalleryAsset[] = [
    {
      id: 'film-still-1',
      title: 'Mirada Abisal (El Armero)',
      category: 'still',
      categoryLabel: 'Imagen de la Película',
      imageSrc: filmStill,
      description: 'Primer plano dramático de nuestro protagonist templado por la ira y la traición.',
      technicalInfo: {
        camera: 'ARRI Alexa LF',
        lens: 'Panavision Primo Anamorphic 50mm T1.8',
        settings: 'ISO 800 | 1/48s | f/2.0'
      },
      narrativeText: 'Esta toma, grabada en los pantanos nublados del norte de Grecia, evoca el rencor reprimido del herrero. El reflejo carmín en su mirada simboliza la muerte inminente del juramento de paz que una vez juró mantener.'
    },
    {
      id: 'behind-scenes-1',
      title: 'Grabando la Coreografía de Acero',
      category: 'behind',
      categoryLabel: 'Detrás de Escena',
      imageSrc: behindScenes1,
      description: 'El operador de cámara rastrea la mítica makhaira entre cortinas de bruma artificial.',
      technicalInfo: {
        camera: 'RED V-Raptor 8K',
        lens: 'Cooke Anamorphic/i 35mm',
        settings: 'ISO 640 | 1/96s | f/2.4'
      },
      narrativeText: 'Un vistazo a los rigurosos esquemas de iluminación donde se cruzaron focos azul cobalto metálico y luces incandescentes de advertencia en rojo sangre. El humo químico fue coloreado con filtros de verde bilis para dar esa vibra de fétida letalidad.'
    }
  ];

  const filteredItems = galleryItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <section id="photography-section" className="py-24 relative bg-[#0d131a] border-t border-[#1a3a4a]/45">
      {/* Visual divider styling with exact color palette */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#4682b4]/30 to-transparent" />
      
      {/* Decorative vertical rails in margins to establish solid cinema aesthetic without clutter */}
      <div className="hidden lg:block absolute left-8 top-24 bottom-24 w-[1px] bg-[#1a3a4a]/20 border-l border-[#1a3a4a]/10" />
      <div className="hidden lg:block absolute right-8 top-24 bottom-24 w-[1px] bg-[#1a3a4a]/20 border-r border-[#1a3a4a]/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="font-mono text-xs text-[#8b0000] uppercase tracking-[0.3em] block font-bold">Imágenes Exclusivas</span>
            <h2 className="font-display text-4xl font-extrabold text-white tracking-widest mt-2">
              FOTOGRAFÍAS Y DETRÁS DE ESCENA
            </h2>
            <p className="text-slate-400 text-sm mt-3 max-w-xl">
              Explora una íntima colección de encuadres de alta fidelidad tomados durante el caótico rodaje de El gran Makhaira.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex bg-[#0a0e14] p-1 border border-[#1a3a4a] rounded-lg self-start">
            {(['all', 'still', 'behind'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#4682b4] text-white shadow-md shadow-sky-950/25 font-bold'
                    : 'text-slate-400 hover:text-white hover:bg-[#0d131a]/40'
                }`}
              >
                {filter === 'all' && 'Todos'}
                {filter === 'still' && 'Fotografías (Stills)'}
                {filter === 'behind' && 'Detrás de Cámaras'}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-[#0d131a]/60 border border-[#1a3a4a]/40 hover:border-[#a8d30d]/40 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 flex flex-col h-full"
            >
              {/* Image Container with lens banner overlay */}
              <div className="relative overflow-hidden aspect-[16/9] bg-black">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Corner light flares visual enhancement */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4">
                  <span className={`font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded inline-flex items-center gap-1.5 border ${
                    item.category === 'still' 
                      ? 'bg-[#4682b4]/20 border-[#4682b4]/45 text-slate-300' 
                      : 'bg-[#a8d30d]/10 border-[#a8d30d]/20 text-[#a8d30d]'
                  }`}>
                    <Film className="w-3 h-3" />
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-1.5 rounded-lg border border-[#1a3a4a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Text metadata footer content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#a8d30d] transition-colors tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1a3a4a]/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <div className="flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-slate-600" />
                    <span>{item.technicalInfo.camera}</span>
                  </div>
                  <span>{item.technicalInfo.settings.split(' | ')[0]}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal System */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/98"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0d131a] border border-[#1a3a4a] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col lg:flex-row relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-[#8b0000] text-white p-2 rounded-full border border-[#1a3a4a]/40 transition-colors cursor-pointer"
                aria-label="Cerrar vista"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Column: Huge High fidelity Display */}
              <div className="lg:w-2/3 bg-black relative flex items-center">
                <img
                  src={selectedPhoto.imageSrc}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[80vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Right Column: Narrative & Technical parameters info */}
              <div className="lg:w-1/3 p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#1a3a4a]/40 bg-[#0a0e14]">
                <div className="space-y-6">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a8d30d] block mb-1 font-bold">
                      {selectedPhoto.categoryLabel}
                    </span>
                    <h3 className="font-display text-2xl font-black text-white tracking-wide">
                      {selectedPhoto.title}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest flex items-center gap-1.5 border-b border-[#1a3a4a]/40 pb-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      CONTEXTO DE PRODUCCIÓN
                    </span>
                    <p className="text-slate-300 text-xs leading-relaxed font-sans">
                      {selectedPhoto.narrativeText}
                    </p>
                  </div>

                  {/* Technical Metadata panel */}
                  <div className="space-y-3 bg-[#0d131a] p-4 rounded-xl border border-[#1a3a4a]/45 font-mono text-[11px]">
                    <span className="text-[#4682b4] uppercase tracking-wider block font-bold text-[10px] flex items-center gap-1">
                      <Camera className="w-4 h-4 text-[#a8d30d]" />
                      METADATOS EXIF
                    </span>
                    <ul className="space-y-1.5 text-slate-400">
                      <li><strong className="text-slate-600">CÁMARA:</strong> {selectedPhoto.technicalInfo.camera}</li>
                      <li><strong className="text-slate-600">ÓPTICA:</strong> {selectedPhoto.technicalInfo.lens}</li>
                      <li><strong className="text-slate-600">PARÁMETROS:</strong> {selectedPhoto.technicalInfo.settings}</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-[#1a3a4a]/40 text-center">
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                    PROPIEDAD DE VEO PRODUCTION CORP © 2026
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
