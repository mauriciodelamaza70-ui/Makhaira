import React, { useEffect, useState } from 'react';
import { Camera, X, ZoomIn, Film, Loader2, ImageOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Cloudinary configuration
const CLOUD_NAME = 'cwv7pshl';
// The client-side "list" delivery endpoint lists resources by TAG (not folder).
// Every image in the "Makhaira" folder must be tagged "Makhaira" in Cloudinary,
// and "Resource list" must be enabled in Settings > Security.
const CLOUDINARY_TAG = 'Makhaira';
const LIST_ENDPOINT = `https://res.cloudinary.com/${CLOUD_NAME}/image/list/${CLOUDINARY_TAG}.json`;

interface CloudinaryResource {
  public_id: string;
  format: string;
  version: number;
  width?: number;
  height?: number;
  context?: { custom?: { caption?: string; alt?: string } };
}

interface GalleryAsset {
  id: string;
  title: string;
  thumbSrc: string;
  fullSrc: string;
}

// Build a Cloudinary delivery URL with automatic format/quality and optional width.
function buildUrl(resource: CloudinaryResource, width?: number): string {
  const transforms = ['f_auto', 'q_auto'];
  if (width) transforms.push(`w_${width}`, 'c_limit');
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms.join(',')}/v${resource.version}/${resource.public_id}.${resource.format}`;
}

// Derive a human-friendly title from the public_id filename.
function titleFromPublicId(publicId: string): string {
  const filename = publicId.split('/').pop() ?? publicId;
  const cleaned = filename
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

export default function BehindScenes() {
  const [items, setItems] = useState<GalleryAsset[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryAsset | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadImages() {
      setStatus('loading');
      try {
        const res = await fetch(LIST_ENDPOINT, { cache: 'no-cache' });
        if (!res.ok) throw new Error(`Cloudinary responded with ${res.status}`);
        const data: { resources?: CloudinaryResource[] } = await res.json();
        const resources = data.resources ?? [];

        const mapped: GalleryAsset[] = resources.map((resource) => ({
          id: resource.public_id,
          title: resource.context?.custom?.caption ?? titleFromPublicId(resource.public_id),
          thumbSrc: buildUrl(resource, 800),
          fullSrc: buildUrl(resource, 1600),
        }));

        if (!cancelled) {
          setItems(mapped);
          setStatus('success');
        }
      } catch (err) {
        console.log('[v0] Cloudinary gallery fetch failed:', err);
        if (!cancelled) setStatus('error');
      }
    }

    loadImages();
    return () => {
      cancelled = true;
    };
  }, []);

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
        </div>

        {/* Loading state */}
        {status === 'loading' && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
            <Loader2 className="w-8 h-8 animate-spin text-[#4682b4]" />
            <span className="font-mono text-xs uppercase tracking-widest">Cargando galería...</span>
          </div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400 text-center max-w-md mx-auto">
            <ImageOff className="w-8 h-8 text-[#8b0000]" />
            <span className="font-mono text-xs uppercase tracking-widest">No se pudieron cargar las imágenes</span>
            <p className="text-slate-500 text-xs leading-relaxed">
              Verifica que la opción &quot;Resource list&quot; esté habilitada en Cloudinary y que las imágenes tengan la etiqueta &quot;Makhaira&quot;.
            </p>
          </div>
        )}

        {/* Empty state */}
        {status === 'success' && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400 text-center">
            <ImageOff className="w-8 h-8 text-slate-600" />
            <span className="font-mono text-xs uppercase tracking-widest">Aún no hay imágenes disponibles</span>
          </div>
        )}

        {/* Gallery Grid */}
        {status === 'success' && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group cursor-pointer bg-[#0d131a]/60 border border-[#1a3a4a]/40 hover:border-[#a8d30d]/40 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/70 flex flex-col h-full"
              >
                {/* Image Container with lens banner overlay */}
                <div className="relative overflow-hidden aspect-[16/9] bg-black">
                  <img
                    src={item.thumbSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="object-cover w-full h-full transform transition-transform duration-1000 group-hover:scale-105"
                  />

                  {/* Corner light flares visual enhancement */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded inline-flex items-center gap-1.5 border bg-[#a8d30d]/10 border-[#a8d30d]/20 text-[#a8d30d]">
                      <Film className="w-3 h-3" />
                      Detrás de Cámaras
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm p-1.5 rounded-lg border border-[#1a3a4a]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Text footer content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-[#a8d30d] transition-colors tracking-wide line-clamp-2">
                    {item.title}
                  </h3>

                  <div className="mt-4 pt-4 border-t border-[#1a3a4a]/30 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <div className="flex items-center gap-1">
                      <Camera className="w-3.5 h-3.5 text-slate-600" />
                      <span>El gran Makhaira</span>
                    </div>
                    <span>BTS</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
              className="bg-[#0d131a] border border-[#1a3a4a] rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col relative"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-black/80 hover:bg-[#8b0000] text-white p-2 rounded-full border border-[#1a3a4a]/40 transition-colors cursor-pointer"
                aria-label="Cerrar vista"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High fidelity Display */}
              <div className="bg-black relative flex items-center justify-center">
                <img
                  src={selectedPhoto.fullSrc}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain max-h-[75vh]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Caption footer */}
              <div className="p-6 flex items-center justify-between gap-4 border-t border-[#1a3a4a]/40 bg-[#0a0e14]">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#a8d30d] block mb-1 font-bold">
                    Detrás de Cámaras
                  </span>
                  <h3 className="font-display text-xl font-black text-white tracking-wide">
                    {selectedPhoto.title}
                  </h3>
                </div>
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest text-right hidden sm:block">
                  PROPIEDAD DE VEO<br />PRODUCTION CORP © 2026
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
