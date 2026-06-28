import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, Music, Disc, RefreshCw, AudioLines } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Track } from '../types';

// Import our custom soundtrack album artwork
import ostCover from '../assets/images/ost_cover_1781135380011.png';

export default function Soundtrack() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Start at gentle 20%
  const [trackProgress, setTrackProgress] = useState(0);
  const [visualizerBars, setVisualizerBars] = useState<number[]>(new Array(16).fill(5));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const droneOscRef = useRef<OscillatorNode | null>(null);
  const waveOscRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const beatTimerRef = useRef<any>(null);
  const trackingIntervalRef = useRef<any>(null);

  const soundtrackList: Track[] = [
    {
      id: 'track-1',
      title: 'Makhaira Héroe Caído (Tema Principal)',
      duration: '4:12',
      genre: 'Industrial Dark Ambient',
      description: 'Dron analógico herrumbrado acompañado por un sub-oscilador profundo y arrastres metálicos que emulan el arcaico acero griego.',
      tempo: 68,
      baseFrequency: 55 // Low A
    },
    {
      id: 'track-2',
      title: 'La Bruma Verde de los Pantanos',
      duration: '3:38',
      genre: 'Modular Drone Symphony',
      description: 'Barridos resonantes de modulación de filtros paso-bajo simulando la asfixia del humo químico.',
      tempo: 48,
      baseFrequency: 49 // Low G
    },
    {
      id: 'track-3',
      title: 'Sangre y Acero',
      duration: '5:02',
      genre: 'Aggressive Synth / Orchestral',
      description: 'Bajo en sierra engranado con percusión implacable de tempo acelerado, ideal para duelos coreografiados.',
      tempo: 124,
      baseFrequency: 82 // Low E
    },
    {
      id: 'track-4',
      title: 'El Tajo Final de la Traición',
      duration: '2:56',
      genre: 'Atmospheric Post-Modern',
      description: 'Una desolada e inolvidable melodía sintetizada flotando sobre un vacío industrial.',
      tempo: 80,
      baseFrequency: 110 // A2
    }
  ];

  const currentTrack = soundtrackList[currentTrackIndex];

  // Initialize and trigger Web Audio Synthesizer
  const startSynth = () => {
    try {
      // Create audio context if it doesn't exist
      const AudioCtxClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Disconnect any existing synth nodes
      stopSynthNodes();

      // 1. Create Nodes
      // Master Gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      // Fade in smoothly
      masterGain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.3);
      gainRef.current = masterGain;

      // Filter (Lowpass, resonant for juicy synth sweeping)
      const biquadFilter = ctx.createBiquadFilter();
      biquadFilter.type = 'lowpass';
      biquadFilter.frequency.setValueAtTime(200, ctx.currentTime);
      biquadFilter.Q.setValueAtTime(8, ctx.currentTime);
      filterRef.current = biquadFilter;

      // Drone Sub Oscillator (Triangle)
      const subOsc = ctx.createOscillator();
      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(currentTrack.baseFrequency, ctx.currentTime);
      droneOscRef.current = subOsc;

      // Main Oscillator (Sawtooth for grittiness)
      const mainOsc = ctx.createOscillator();
      mainOsc.type = 'sawtooth';
      mainOsc.frequency.setValueAtTime(currentTrack.baseFrequency * 1.5, ctx.currentTime); // Perfect fifth fifth
      waveOscRef.current = mainOsc;

      // LFO for filter sweep
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      // Speed up frequency slightly with larger tempo
      const lfoSpeed = currentTrack.tempo / 120;
      lfo.frequency.setValueAtTime(lfoSpeed, ctx.currentTime);
      lfoRef.current = lfo;

      // LFO Gain to modulate filter frequency
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(150, ctx.currentTime); // sweep between current -150 and +150hz

      // Connect LFO Modulator to filter sweep
      lfo.connect(lfoGain);
      lfoGain.connect(biquadFilter.frequency);

      // Connect Signal Path
      subOsc.connect(biquadFilter);
      mainOsc.connect(biquadFilter);
      biquadFilter.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Start oscillators
      subOsc.start();
      mainOsc.start();
      lfo.start();

      // Create a beat pulsing rhythm sequencer using scheduler
      const beatIntervalMs = (60 / currentTrack.tempo) * 1000;
      beatTimerRef.current = setInterval(() => {
        triggerPulseBlip(ctx, biquadFilter, masterGain);
      }, beatIntervalMs);

    } catch (e) {
      console.warn("Web Audio no está fully soportado por este navegador o iFrame: ", e);
    }
  };

  // Trigger metallic synth pluck on beats
  const triggerPulseBlip = (ctx: AudioContext, filter: BiquadFilterNode, masterGain: GainNode) => {
    try {
      const pluck = ctx.createOscillator();
      pluck.type = 'sine';
      // Harmonic note above base
      const pluckFreq = currentTrack.baseFrequency * 4;
      pluck.frequency.setValueAtTime(pluckFreq, ctx.currentTime);

      // Pluck Gain envelope
      const pluckGain = ctx.createGain();
      pluckGain.gain.setValueAtTime(0, ctx.currentTime);
      // Plucks should be subtle
      pluckGain.gain.linearRampToValueAtTime(volume * 0.4, ctx.currentTime + 0.02);
      pluckGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

      // Connect Pluck
      pluck.connect(filter);
      pluck.connect(pluckGain);
      pluckGain.connect(ctx.destination);

      pluck.start();
      pluck.stop(ctx.currentTime + 0.5);

      // Momentarily push filter cutoff frequency up to open resonance
      filter.frequency.setValueAtTime(600, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.35);

    } catch (err) {
      // fail silently
    }
  };

  // Stop synthesizer nodes gracefully with fade-out
  const stopSynth = () => {
    if (gainRef.current && audioCtxRef.current) {
      const ctx = audioCtxRef.current;
      try {
        gainRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15);
        setTimeout(() => {
          stopSynthNodes();
        }, 160);
      } catch (err) {
        stopSynthNodes();
      }
    } else {
      stopSynthNodes();
    }
  };

  const stopSynthNodes = () => {
    if (beatTimerRef.current) {
      clearInterval(beatTimerRef.current);
      beatTimerRef.current = null;
    }

    try {
      if (droneOscRef.current) { droneOscRef.current.stop(); droneOscRef.current.disconnect(); }
      if (waveOscRef.current) { waveOscRef.current.stop(); waveOscRef.current.disconnect(); }
      if (lfoRef.current) { lfoRef.current.stop(); lfoRef.current.disconnect(); }
      if (filterRef.current) { filterRef.current.disconnect(); }
      if (gainRef.current) { gainRef.current.disconnect(); }
    } catch (e) {}

    droneOscRef.current = null;
    waveOscRef.current = null;
    lfoRef.current = null;
    filterRef.current = null;
    gainRef.current = null;
  };

  // Sync volume slider with Web Audio Node
  useEffect(() => {
    if (gainRef.current && audioCtxRef.current) {
      try {
        gainRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 0.1);
      } catch (err) {}
    }
  }, [volume]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      startSynth();
    }
  };

  // Switch Track
  const handleTrackChange = (index: number) => {
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      stopSynth();
    }
    setCurrentTrackIndex(index);
    setTrackProgress(0);

    if (wasPlaying) {
      // Re-trigger with new frequencies
      setTimeout(() => {
        startSynth();
      }, 50);
    }
  };

  // Visualizer Animation Loop
  useEffect(() => {
    let animId: any;
    const updateVisualizer = () => {
      if (isPlaying) {
        setVisualizerBars((prev) =>
          prev.map((val) => {
            // Speed scaling of bounce based on tempo
            const speedMultiplier = currentTrack.tempo / 40;
            const fluctuation = (Math.random() - 0.5) * 4 * speedMultiplier;
            const updated = Math.max(2, Math.min(28, val + fluctuation));
            return updated;
          })
        );
      } else {
        setVisualizerBars((prev) => prev.map((val) => Math.max(1, val * 0.85)));
      }
      animId = requestAnimationFrame(updateVisualizer);
    };
    animId = requestAnimationFrame(updateVisualizer);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentTrack]);

  // Simulated Track Progress bar
  useEffect(() => {
    if (isPlaying) {
      trackingIntervalRef.current = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev >= 100) {
            // Auto skip to next
            const nextIndex = (currentTrackIndex + 1) % soundtrackList.length;
            handleTrackChange(nextIndex);
            return 0;
          }
          return prev + 0.8;
        });
      }, 500);
    } else {
      if (trackingIntervalRef.current) {
        clearInterval(trackingIntervalRef.current);
      }
    }
    return () => clearInterval(trackingIntervalRef.current);
  }, [isPlaying, currentTrackIndex]);

  // Cleanup synthesizer on component unmount
  useEffect(() => {
    return () => {
      stopSynth();
    };
  }, []);

  return (
    <section id="soundtrack-section" className="py-24 relative bg-[#0d131a] overflow-hidden border-t border-[#1a3a4a]/45">
      {/* Visual background noise */}
      <div className="absolute top-[30%] left-[25%] w-[800px] h-[300px] rounded-full bg-[#4682b4]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.3em] block font-bold">Sinfonía Herrada</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest mt-2">
            MÚSICA ORIGINAL
          </h2>
          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#8b0000] to-transparent mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Cinematic Audio Player */}
          <div className="lg:col-span-5">
            <div className="bg-[#0a0e14] p-6 sm:p-8 rounded-2xl border border-[#1a3a4a] shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#a8d30d]/5 rounded-full blur-2xl group-hover:bg-[#a8d30d]/10 transition-colors pointer-events-none" />

              {/* Cover Artwork Container */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-6 bg-black shadow-lg">
                <img
                  src={ostCover}
                  alt="Carátula Banda Sonora Oficial"
                  referrerPolicy="no-referrer"
                  className={`object-cover w-full h-full transition-transform duration-1000 ${
                    isPlaying ? 'scale-105 rotate-1 animate-pulseUnique' : ''
                  }`}
                />
                
                {/* Playing Vinyl Record Spin Representation */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#0d131a] border border-[#1a3a4a] flex items-center justify-center animate-spin" style={{ animationDuration: '8s' }}>
                    <Disc className="w-8 h-8 text-[#a8d30d]" />
                  </div>
                </div>

                {/* Left badge for genre */}
                <span className="absolute bottom-4 left-4 bg-black/80 font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded border border-[#1a3a4a]/40 text-[#4682b4] font-bold">
                  {currentTrack.genre}
                </span>
              </div>

              {/* Player text info info */}
              <div className="text-center space-y-1 mb-6">
                <span className="font-mono text-[9px] text-[#8b0000] uppercase tracking-[0.2em] font-bold">REPRODUCIENDO PÁGINA</span>
                <h3 className="font-display text-xl font-bold text-white tracking-wide truncate">
                  {currentTrack.title}
                </h3>
                <p className="font-mono text-xs text-slate-500 font-bold">
                  MAURICIO DE LA MAZA & COSETTE SYNTHS / TEMP: {currentTrack.tempo} BPM
                </p>
              </div>

              {/* Visualizer Display Bars */}
              <div className="h-10 flex items-end justify-center gap-[3px] mb-6 px-1">
                {visualizerBars.map((height, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-sm transition-all duration-75"
                    style={{
                      height: `${height * 3.3}%`,
                      backgroundColor: i % 2 === 0 ? 'var(--color-bile)' : 'var(--color-steel)'
                    }}
                  />
                ))}
              </div>

              {/* Fake Timeline Control */}
              <div className="space-y-2 mb-6">
                <div className="h-[3px] bg-slate-950 rounded-full relative overflow-hidden cursor-pointer">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-[#4682b4] to-[#a8d30d]"
                    style={{ width: `${trackProgress}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-slate-500">
                  <span>
                    {isPlaying
                      ? `${Math.floor((trackProgress / 100) * parseInt(currentTrack.duration[0]))}:` +
                        String(Math.floor(((trackProgress / 100) * 60) % 60)).padStart(2, '0')
                      : '0:00'}
                  </span>
                  <span>{currentTrack.duration}</span>
                </div>
              </div>

              {/* Main Player Transport Buttons */}
              <div className="flex items-center justify-between gap-4">
                {/* Volume Slider section */}
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-slate-500" />
                  <input
                    type="range"
                    min="0"
                    max="0.5"
                    step="0.01"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 accent-[#a8d30d] h-1 bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Volumen"
                  />
                </div>

                {/* Central Play/Pause Circular button */}
                <button
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#8b0000] to-red-850 hover:from-red-650 hover:to-[#a8d30d] hover:text-black text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border border-[#8b0000]/40 cursor-pointer"
                  aria-label={isPlaying ? 'Pausar tema' : 'Reproducir tema'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>

                {/* Code-based Synth Info tooltip */}
                <div className="inline-flex items-center gap-1 text-slate-500 font-mono text-[9px]">
                  <AudioLines className={`w-4 h-4 ${isPlaying ? 'text-[#a8d30d] animate-pulse' : ''}`} />
                  <span>SYNTH</span>
                </div>
              </div>

              {/* Warning to verify authorization */}
              <p className="mt-4 text-[9px] text-slate-500 text-center font-mono uppercase tracking-widest border-t border-[#1a3a4a]/40 pt-3">
                Síntesis analógica generada enteramente por código en tiempo real
              </p>
            </div>
          </div>

          {/* Column 2: Interactive Interactive Tracklist */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8b0000]/15 border border-[#8b0000]/30 rounded-full">
                <Music className="w-3.5 h-3.5 text-[#8b0000]" />
                <span className="font-mono text-[10px] text-[#8b0000] tracking-widest uppercase font-bold">Pistas de Audio</span>
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white tracking-wider">
                LISTA DE CORTE: LA BANDA SONORA DE LA HOJA
              </h3>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                Cada sintetizador analógico de la partitura de <strong className="text-white">Mauricio de la Maza</strong> ha sido programado con cuidado rítmico. Haz clic en cualquier pista a continuación para cargarla, o reproduce directamente el sintetizador integrado arriba.
              </p>
            </div>

            <div className="space-y-3">
              {soundtrackList.map((track, i) => {
                const isCurrent = i === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => handleTrackChange(i)}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-slate-905/60 border-[#a8d30d]/50 shadow-md shadow-[#a8d30d]/5'
                        : 'bg-[#0a0e14]/40 border-[#1a3a4a]/45 hover:border-[#4682b4]/30 hover:bg-[#0d131a]'
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0 pr-4">
                      {/* Track index representation */}
                      <div className="w-9 h-9 rounded-lg bg-[#0d131a] border border-[#1a3a4a]/45 flex items-center justify-center shrink-0">
                        {isCurrent && isPlaying ? (
                          <RefreshCw className="w-4 h-4 text-[#a8d30d] animate-spin" style={{ animationDuration: '3s' }} />
                        ) : (
                          <span className="font-mono text-xs font-bold text-slate-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        )}
                      </div>

                      {/* Title descriptions */}
                      <div className="space-y-0.5 truncate">
                        <h4 className={`text-sm font-bold tracking-wide truncate ${isCurrent ? 'text-[#a8d30d]' : 'text-slate-200'}`}>
                          {track.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-relaxed font-sans truncate">
                          {track.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs text-slate-500">{track.duration}</span>
                      <div className={`p-1.5 rounded-full ${isCurrent && isPlaying ? 'bg-[#a8d30d]/10 text-[#a8d30d]' : 'bg-slate-900 border border-slate-850 text-slate-500'}`}>
                        {isCurrent && isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
