import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  auth, 
  db, 
  loginWithGoogle, 
  logoutUser, 
  handleFirestoreError, 
  OperationType,
  isFirebasePlaceholder
} from '../lib/firebase';
import { 
  collection, 
  onSnapshot, 
  setDoc, 
  doc, 
  deleteDoc, 
  query, 
  orderBy, 
  limit, 
  increment, 
  updateDoc 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  Flame, 
  MessageSquare, 
  Trash2, 
  Lock, 
  LogOut, 
  Star, 
  Send, 
  Sparkles, 
  ThumbsUp, 
  User as UserIcon,
  ChevronsUpDown
} from 'lucide-react';

interface AudienceReview {
  id: string;
  userId: string;
  authorName: string;
  authorPhoto: string;
  comment: string;
  rating: number;
  createdAt: any;
  hypeCount: number;
  hasLikedByClient?: boolean; // Client-side toggled state per session
}

interface HypeVote {
  userId: string;
  hypeLevel: number;
}

const DEFAULT_MOCK_REVIEWS: AudienceReview[] = [
  {
    id: 'rev_1',
    userId: 'user_critico_1',
    authorName: 'Mauricio de la Maza (Fan Club)',
    authorPhoto: '',
    comment: 'Una obra de suspenso magistral. Los hilos del circo se entrelazan de manera tétrica y sublime. La música de fondo te eriza la piel.',
    rating: 10,
    createdAt: new Date(Date.now() - 3600000 * 24 * 2), // 2 days ago
    hypeCount: 34
  },
  {
    id: 'rev_2',
    userId: 'user_critico_2',
    authorName: 'Crítica de Morelia',
    authorPhoto: '',
    comment: 'El Gran Makhaira redefine el thriller independiente mexicano. Excelente manejo del color verde bile y carmesí en su paleta visual.',
    rating: 9,
    createdAt: new Date(Date.now() - 3600000 * 12), // 12 hours ago
    hypeCount: 21
  },
  {
    id: 'rev_3',
    userId: 'user_critico_3',
    authorName: 'Sofía Santoyo',
    authorPhoto: '',
    comment: '¿Quién tiene el poder real? El misticismo alrededor de Eitán es fascinante. ¡Ya quiero verla en streaming!',
    rating: 8,
    createdAt: new Date(Date.now() - 3600000 * 4), // 4 hours ago
    hypeCount: 15
  }
];

const DEFAULT_MOCK_HYPES: HypeVote[] = [
  { userId: 'user_1', hypeLevel: 95 },
  { userId: 'user_2', hypeLevel: 88 },
  { userId: 'user_3', hypeLevel: 90 },
  { userId: 'user_4', hypeLevel: 75 },
  { userId: 'user_5', hypeLevel: 92 },
  { userId: 'user_critico_1', hypeLevel: 100 },
  { userId: 'user_critico_2', hypeLevel: 85 },
  { userId: 'user_critico_3', hypeLevel: 80 }
];

export default function AudienceLedger() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Stats
  const [reviews, setReviews] = useState<AudienceReview[]>([]);
  const [hypeVotes, setHypeVotes] = useState<HypeVote[]>([]);
  
  // Real-time calculation
  const [averageHype, setAverageHype] = useState<number>(85); // Default fallback

  // Form State
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(9);
  const [userHypeInput, setUserHypeInput] = useState(90);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Simulated Login Modal State
  const [showMockLogin, setShowMockLogin] = useState(false);
  const [mockName, setMockName] = useState('');
  const [mockRole, setMockRole] = useState('Espectador');

  // Track if current user has reviewed or voted
  const userReview = reviews.find(r => r.userId === user?.uid);
  const userVote = hypeVotes.find(v => v.userId === user?.uid);

  // Track liked comments locally (during session to prevent double hype trigger)
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  // Listen to Auth State
  useEffect(() => {
    if (isFirebasePlaceholder) {
      const savedUser = localStorage.getItem('makhaira_mock_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      setAuthLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        // Initialize inputs based on already existing data if they exist
        const vote = hypeVotes.find(v => v.userId === currentUser.uid);
        if (vote) {
          setUserHypeInput(vote.hypeLevel);
        }
      }
    });
    return () => unsubscribe();
  }, [hypeVotes]);

  // Listen to Reviews collections in Real-time
  useEffect(() => {
    if (isFirebasePlaceholder) {
      const savedReviews = localStorage.getItem('makhaira_mock_reviews');
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews).map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt)
        }));
        setReviews(parsed);
      } else {
        localStorage.setItem('makhaira_mock_reviews', JSON.stringify(DEFAULT_MOCK_REVIEWS));
        setReviews(DEFAULT_MOCK_REVIEWS.map(r => ({ ...r, createdAt: new Date(r.createdAt) })));
      }
      return;
    }

    const qReviews = query(collection(db, 'audienceReviews'), orderBy('createdAt', 'desc'), limit(40));
    
    const unsubscribe = onSnapshot(qReviews, (snapshot) => {
      const loadedReviews: AudienceReview[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loadedReviews.push({
          id: docSnap.id,
          userId: data.userId || '',
          authorName: data.authorName || 'Espectador Anónimo',
          authorPhoto: data.authorPhoto || '',
          comment: data.comment || '',
          rating: data.rating || 10,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
          hypeCount: data.hypeCount || 0
        });
      });
      setReviews(loadedReviews);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'audienceReviews');
    });

    return () => unsubscribe();
  }, []);

  // Listen to Hype Votes in Real-time
  useEffect(() => {
    if (isFirebasePlaceholder) {
      const savedHypes = localStorage.getItem('makhaira_mock_hypes');
      let loadedHypes: HypeVote[] = [];
      if (savedHypes) {
        loadedHypes = JSON.parse(savedHypes);
      } else {
        loadedHypes = DEFAULT_MOCK_HYPES;
        localStorage.setItem('makhaira_mock_hypes', JSON.stringify(DEFAULT_MOCK_HYPES));
      }
      setHypeVotes(loadedHypes);
      if (loadedHypes.length > 0) {
        const sum = loadedHypes.reduce((acc, curr) => acc + curr.hypeLevel, 0);
        setAverageHype(Math.round(sum / loadedHypes.length));
      } else {
        setAverageHype(88);
      }
      return;
    }

    const qHypes = collection(db, 'audienceHypes');
    
    const unsubscribe = onSnapshot(qHypes, (snapshot) => {
      const loadedHypes: HypeVote[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        loadedHypes.push({
          userId: docSnap.id,
          hypeLevel: Number(data.hypeLevel) || 85
        });
      });
      setHypeVotes(loadedHypes);

      // Compute statistics
      if (loadedHypes.length > 0) {
        const sum = loadedHypes.reduce((acc, curr) => acc + curr.hypeLevel, 0);
        setAverageHype(Math.round(sum / loadedHypes.length));
      } else {
        setAverageHype(88); // Safe default for brand appeal
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'audienceHypes');
    });

    return () => unsubscribe();
  }, []);

  // Sync personal hype input when personal vote loaded
  useEffect(() => {
    if (user && userVote) {
      setUserHypeInput(userVote.hypeLevel);
    }
  }, [user, userVote]);

  // Auth actions
  const handleLogin = async () => {
    if (isFirebasePlaceholder) {
      setShowMockLogin(true);
      return;
    }
    try {
      await loginWithGoogle();
      setMessage({ text: 'Sesión iniciada con éxito', type: 'success' });
    } catch (err: any) {
      setMessage({ text: 'Error al iniciar sesión', type: 'error' });
    }
  };

  const handleLogout = async () => {
    if (isFirebasePlaceholder) {
      localStorage.removeItem('makhaira_mock_user');
      setUser(null);
      setMessage({ text: 'Sesión simulada cerrada con éxito', type: 'success' });
      return;
    }
    try {
      await logoutUser();
      setMessage({ text: 'Sesión cerrada', type: 'success' });
    } catch (err: any) {
      setMessage({ text: 'Error al cerrar sesión', type: 'error' });
    }
  };

  // Submit spectating review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (newComment.trim().length === 0) {
      setMessage({ text: 'Por favor, escribe un comentario antes de enviar.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    if (isFirebasePlaceholder) {
      setTimeout(() => {
        const reviewId = `mock_review_${Date.now()}`;
        const newRev: AudienceReview = {
          id: reviewId,
          userId: user.uid,
          authorName: user.displayName || 'Makhaira Fan',
          authorPhoto: user.photoURL || '',
          comment: newComment,
          rating: Number(newRating),
          createdAt: new Date(),
          hypeCount: 0
        };

        const currentReviews = [newRev, ...reviews];
        localStorage.setItem('makhaira_mock_reviews', JSON.stringify(currentReviews));
        setReviews(currentReviews);
        setNewComment('');
        setIsSubmitting(false);
        setMessage({ text: '¡Tu reseña se ha guardado localmente en tu navegador!', type: 'success' });
      }, 500);
      return;
    }

    // Document ID is unique per user to prevent duplicate reviews by a single account
    const reviewId = `review_${user.uid}`;
    const collectionPath = 'audienceReviews';

    try {
      const payload = {
        userId: user.uid,
        authorName: user.displayName || 'Makhaira Fan',
        authorPhoto: user.photoURL || '',
        comment: newComment,
        rating: Number(newRating),
        createdAt: new Date(),
        hypeCount: 0
      };

      await setDoc(doc(db, collectionPath, reviewId), payload);
      setNewComment('');
      setMessage({ text: '¡Tu reseña y veredicto se han cincelado en el Logbook!', type: 'success' });
    } catch (error: any) {
      try {
        handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${reviewId}`);
      } catch (mappedError: any) {
        setMessage({ text: `Acceso denegado de seguridad: ${mappedError.message}`, type: 'error' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete own review
  const handleDeleteReview = async (reviewId: string) => {
    if (!user) return;
    if (!window.confirm('¿Seguro que deseas remover tu veredicto del Logbook?')) return;

    if (isFirebasePlaceholder) {
      const filtered = reviews.filter(r => r.id !== reviewId);
      localStorage.setItem('makhaira_mock_reviews', JSON.stringify(filtered));
      setReviews(filtered);
      setMessage({ text: 'Tu reseña simulada fue removida con éxito.', type: 'success' });
      return;
    }

    const collectionPath = 'audienceReviews';
    try {
      await deleteDoc(doc(db, collectionPath, reviewId));
      setMessage({ text: 'Tu reseña fue removida con éxito.', type: 'success' });
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, `${collectionPath}/${reviewId}`);
      } catch (mappedError: any) {
        setMessage({ text: 'No tienes permisos para borrar esta entrada.', type: 'error' });
      }
    }
  };

  // Submit or edit anticipation Hype level
  const handleHypeVoteSubmit = async (val: number) => {
    if (!user) return;
    
    if (isFirebasePlaceholder) {
      const savedHypes = localStorage.getItem('makhaira_mock_hypes');
      let currentHypes: HypeVote[] = savedHypes ? JSON.parse(savedHypes) : [...DEFAULT_MOCK_HYPES];
      
      const existingIdx = currentHypes.findIndex(h => h.userId === user.uid);
      if (existingIdx >= 0) {
        currentHypes[existingIdx].hypeLevel = Number(val);
      } else {
        currentHypes.push({ userId: user.uid, hypeLevel: Number(val) });
      }
      
      localStorage.setItem('makhaira_mock_hypes', JSON.stringify(currentHypes));
      setHypeVotes(currentHypes);
      
      const sum = currentHypes.reduce((acc, curr) => acc + curr.hypeLevel, 0);
      setAverageHype(Math.round(sum / currentHypes.length));
      
      setUserHypeInput(val);
      setMessage({ text: `¡Tu expectativa se ha actualizado al ${val}%!`, type: 'success' });
      return;
    }

    const collectionPath = 'audienceHypes';
    const documentId = user.uid;

    try {
      const payload = {
        userId: user.uid,
        hypeLevel: Number(val),
        votedAt: new Date()
      };
      
      await setDoc(doc(db, collectionPath, documentId), payload);
      setUserHypeInput(val);
      setMessage({ text: `¡Tu expectativa se ha actualizado al ${val}%!`, type: 'success' });
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, `${collectionPath}/${documentId}`);
      } catch (mappedError: any) {
        setMessage({ text: 'Error al enviar votación táctica.', type: 'error' });
      }
    }
  };

  // Reactive Hype Action (increment or decrement the like)
  const handleToggleLikeReview = async (rev: AudienceReview) => {
    if (!user) {
      setMessage({ text: 'Debes iniciar sesión para reaccionar', type: 'error' });
      return;
    }

    const reviewId = rev.id;
    const isCurrentlyLiked = likedReviews.has(reviewId);

    if (isFirebasePlaceholder) {
      const change = isCurrentlyLiked ? -1 : 1;
      const updated = reviews.map(r => {
        if (r.id === reviewId) {
          return { ...r, hypeCount: Math.max(0, r.hypeCount + change) };
        }
        return r;
      });

      localStorage.setItem('makhaira_mock_reviews', JSON.stringify(updated));
      setReviews(updated);

      setLikedReviews(prev => {
        const next = new Set(prev);
        if (isCurrentlyLiked) {
          next.delete(reviewId);
        } else {
          next.add(reviewId);
        }
        return next;
      });
      return;
    }

    const collectionPath = 'audienceReviews';

    try {
      // Opt-in reactive update in state to show instant feedback
      const change = isCurrentlyLiked ? -1 : 1;
      
      await updateDoc(doc(db, collectionPath, reviewId), {
        hypeCount: increment(change)
      });

      setLikedReviews(prev => {
        const next = new Set(prev);
        if (isCurrentlyLiked) {
          next.delete(reviewId);
        } else {
          next.add(reviewId);
        }
        return next;
      });
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, `${collectionPath}/${reviewId}`);
      } catch (mappedError: any) {
        setMessage({ text: 'Fallo al interactuar con el servidor.', type: 'error' });
      }
    }
  };

  return (
    <section id="audience-ledger" className="py-24 relative bg-[#090d12] overflow-hidden border-t border-[#1a3a4a]/30">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-[-15%] w-[500px] h-[500px] rounded-full bg-[#a8d30d]/3 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-[-15%] w-[500px] h-[500px] rounded-full bg-[#8b0000]/3 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block & Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="font-mono text-xs text-[#a8d30d] uppercase tracking-[0.35em] block font-bold">
            CONEXIÓN ACTIVA • EN TIEMPO REAL
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-widest uppercase font-cinzel-forced">
            LEDGER DE EXPECTATIVA
          </h2>
          <div className="w-32 h-[1.5px] bg-[#8b0000] mx-auto" />
          <p className="font-display text-slate-400 text-xs sm:text-sm tracking-wider max-w-xl mx-auto italic font-cinzel-forced">
            El termómetro público de especulación del circo y foro bilingüe definitivo
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Termómetro de Hype y Panel de Cuenta (4 Columnas) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Hype-ometer statistics container */}
            <div className="bg-[#0b0f14] p-8 rounded-2xl border border-[#1a3a4a]/60 shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-[#8b0000] to-[#a8d30d]" />
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#4682b4] font-bold">
                    HYPOMETER REAL
                  </span>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#a8d30d]/20 rounded border border-[#a8d30d]/30">
                    <Flame className="w-3 h-3 text-[#a8d30d] animate-pulse" />
                    <span className="font-mono text-[9px] text-white font-bold">{hypeVotes.length} Votos</span>
                  </div>
                </div>

                <div className="text-center py-6">
                  <h3 className="font-display text-7xl font-black text-white leading-none tracking-tighter relative inline-block">
                    {averageHype}%
                  </h3>
                  <p className="font-mono text-[10px] text-[#a8d30d] uppercase tracking-widest mt-2 font-bold">
                    EXPECTACIÓN GLOBAL
                  </p>
                </div>

                {/* Vertical thermic styled gauge */}
                <div className="relative w-full h-3 bg-[#0d131a] border border-slate-900 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${averageHype}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#8b0000] via-[#4682b4] to-[#a8d30d]"
                  />
                </div>

                <p className="text-xs text-slate-400 font-sans leading-relaxed text-justify">
                  Este registro evalúa el porcentaje de impaciencia colectivo. Añade tu voto a la bruma de Morelia regulando el marcador inferior.
                </p>
              </div>

              {/* Hype input block if user signed in */}
              <div className="mt-8 pt-6 border-t border-[#1a3a4a]/40 space-y-4">
                {user ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-300">
                      <span>Tu barómetro personal:</span>
                      <span className="font-bold text-[#a8d30d]">{userHypeInput}%</span>
                    </div>
                    
                    <input 
                      type="range"
                      min="1"
                      max="100"
                      value={userHypeInput}
                      onChange={(e) => setUserHypeInput(Number(e.target.value))}
                      onTouchEnd={() => handleHypeVoteSubmit(userHypeInput)}
                      onMouseUp={() => handleHypeVoteSubmit(userHypeInput)}
                      className="w-full accent-[#a8d30d] bg-[#0d131a] cursor-pointer"
                    />

                    <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                      <span>Frío</span>
                      <span>Muerte Temprana</span>
                      <span>En Llamas</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-black/40 rounded border border-[#1a3a4a]/30 text-center">
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-2">
                      Inicia sesión para votar
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Auth panel with Google Login */}
            <div className="bg-[#0b0f14] p-6 rounded-2xl border border-[#1a3a4a]/60 shadow-2xl relative overflow-hidden">
              {authLoading ? (
                <div className="flex justify-center py-4">
                  <div className="w-5 h-5 border-2 border-t-transparent border-[#a8d30d] rounded-full animate-spin" />
                </div>
              ) : user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || 'Spectator'} 
                        className="w-10 h-10 rounded-full border border-[#a8d30d]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-[#1a3a4a]">
                        <UserIcon className="w-5 h-5 text-slate-400" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate font-display font-cinzel-forced">
                        {user.displayName}
                      </h4>
                      <p className="text-[10px] font-mono text-[#a8d30d] truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded bg-transparent hover:bg-red-950/20 text-slate-400 hover:text-white border border-[#8b0000]/30 hover:border-[#8b0000] text-xs font-mono transition-all duration-300 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    CERRAR SESIÓN
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <Lock className="w-6 h-6 text-[#8b0000] mx-auto animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-display font-black text-white tracking-widest uppercase font-cinzel-forced">
                      ACCEDER AL CIRCO
                    </h4>
                    <p className="text-[11px] font-sans text-slate-400 leading-relaxed max-w-xs mx-auto">
                      Registra tu barómetro personal y publica reseñas directas en tiempo real.
                    </p>
                  </div>

                  <button
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-[#8b0000] to-red-900 text-white rounded font-mono text-xs font-bold tracking-wider hover:from-red-950 hover:to-[#a8d30d] hover:text-black hover:scale-[1.02] transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.73 0 3.32.63 4.56 1.68l2.43-2.43C17.18 1.54 14.86 1 12.24 1c-5.52 0-10 4.48-10 10s4.48 10 10 10c5.78 0 9.6-4.06 9.6-9.78 0-.66-.06-1.3-.18-1.93H12.24z"/>
                    </svg>
                    INGRESAR CON GOOGLE
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* El Logbook de Comentarios (8 Columnas) */}
          <div className="lg:col-span-8 flex flex-col gap-6">

            {/* Notification triggers */}
            <AnimatePresence>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`p-4 rounded-xl border text-xs font-mono flex items-center justify-between gap-3 ${
                    message.type === 'success' 
                      ? 'bg-slate-900 border-[#a8d30d]/30 text-slate-200' 
                      : 'bg-red-950/20 border-[#8b0000]/30 text-red-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#a8d30d] shrink-0" />
                    <p>{message.text}</p>
                  </div>
                  <button 
                    onClick={() => setMessage(null)} 
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Write comment block */}
            {user && (
              <form 
                onSubmit={handleSubmitReview}
                className="bg-[#0b0f14] p-6 rounded-2xl border border-[#a8d30d]/20 shadow-2xl space-y-4"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#a8d30d]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-slate-300 font-bold">
                      {userReview ? 'Editar tu Log de Espectador' : 'Registrar nueva Bitácora / Crítica'}
                    </span>
                  </div>

                  {/* Rating selection */}
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-slate-400">Verdicto de Escenario:</span>
                    <div className="flex items-center gap-1.5 bg-[#0d131a] px-3 py-1 rounded border border-[#1a3a4a]/45">
                      <Star className="w-3.5 h-3.5 text-[#a8d30d] fill-current" />
                      <select 
                        value={newRating}
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        className="bg-transparent text-white font-mono text-xs font-bold focus:outline-none cursor-pointer"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i+1} value={i+1} className="bg-[#0a0e14] text-white">
                            {i+1}/10
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    rows={3}
                    maxLength={1000}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Escribe tu reseña o expectación... ¿Logrará Eitán domar el filo de la Makhaira? Máx. 1000 caracteres."
                    className="w-full bg-[#0d131a] border border-[#1a3a4a] focus:border-[#4682b4] rounded-xl p-4 text-xs font-serif-elegant leading-relaxed text-[#e0e0e0] placeholder-slate-600 focus:outline-none transition-all resize-none"
                  />
                  <div className="absolute bottom-2.5 right-3 text-[9px] font-mono text-slate-600">
                    {newComment.length}/1000
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 bg-[#8b0000] hover:bg-[#a8d30d] text-white hover:text-black border border-[#1a3a4a] text-xs font-mono font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-md shadow-red-950/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isSubmitting ? 'PUBLICANDO EN EL LEDGER...' : 'CINCELAR BITÁCORA'}
                  </button>
                </div>
              </form>
            )}

            {/* List block */}
            <div className="bg-[#0b0f14] p-8 rounded-2xl border border-[#1a3a4a]/60 shadow-2xl flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#1a3a4a]/30">
                <span className="font-mono text-xs text-slate-400 flex items-center gap-2">
                  <ChevronsUpDown className="w-4 h-4 text-[#4682b4]" />
                  REGISTRO RECIENTE ({reviews.length})
                </span>
                <span className="font-mono text-[9px] text-[#4682b4] uppercase tracking-widest">
                  Auto-Actualizado hace segundos
                </span>
              </div>

              {/* Scrollable container */}
              <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-slate-500 font-mono text-xs space-y-2">
                    <MessageSquare className="w-6 h-6 text-slate-700 mx-auto" />
                    <p>No se han registrado bitácoras de la audiencia aún.</p>
                    <p className="text-[10px] text-slate-600">¡Sé el primero en plasmar tu opinión sobre El Gran Makhaira!</p>
                  </div>
                ) : (
                  reviews.map((rev) => {
                    const hasLiked = likedReviews.has(rev.id);
                    const isOwnComment = rev.userId === user?.uid;

                    return (
                      <div 
                        key={rev.id}
                        className="pb-6 border-b border-[#1a3a4a]/20 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-center gap-3">
                            {rev.authorPhoto ? (
                              <img 
                                src={rev.authorPhoto} 
                                alt={rev.authorName} 
                                className="w-9 h-9 rounded-full border border-slate-800"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <UserIcon className="w-4 h-4 text-slate-400" />
                              </div>
                            )}
                            <div>
                              <h4 className="text-xs font-bold text-white font-display tracking-wider flex items-center gap-1.5 leading-none">
                                {rev.authorName}
                                {isOwnComment && (
                                  <span className="text-[8px] bg-[#a8d30d]/20 text-[#a8d30d] px-1.5 py-0.5 rounded font-mono">TU BITÁCORA</span>
                                )}
                              </h4>
                              <span className="text-[9px] font-mono text-slate-500 block mt-1">
                                {rev.createdAt.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#8b0000]/10 rounded border border-[#8b0000]/30">
                              <Star className="w-3 h-3 text-[#8b0000] fill-current" />
                              <span className="font-mono text-[10px] text-white font-bold">{rev.rating}/10</span>
                            </div>

                            {/* Delete Button */}
                            {isOwnComment && (
                              <button
                                onClick={() => handleDeleteReview(rev.id)}
                                className="p-1 hover:bg-slate-900 rounded text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                                title="Borrar reseña"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Comment Text */}
                        <p className="mt-3 text-slate-300 font-serif-elegant text-xs sm:text-sm leading-relaxed text-justify pl-12 pr-2">
                          "{rev.comment}"
                        </p>

                        {/* Interactive Hype feedback button */}
                        <div className="flex justify-end gap-4 mt-3 text-[10px] font-mono text-slate-500">
                          <button
                            onClick={() => handleToggleLikeReview(rev)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors cursor-pointer ${
                              hasLiked 
                                ? 'bg-[#a8d30d]/15 text-white font-bold border border-[#a8d30d]/30' 
                                : 'hover:bg-slate-900 hover:text-slate-300'
                            }`}
                          >
                            <ThumbsUp className={`w-3 h-3 ${hasLiked ? 'text-[#a8d30d] fill-current' : ''}`} />
                            <span>Rematado x {rev.hypeCount}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Simulated Login Modal */}
      <AnimatePresence>
        {showMockLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0b0f14] border border-[#a8d30d]/30 rounded-2xl max-w-md w-full p-6 space-y-6 relative shadow-2xl"
            >
              {/* Top color accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b0000] to-[#a8d30d] rounded-t-2xl" />
              
              <div className="space-y-2 text-center pt-2">
                <span className="font-mono text-[9px] text-[#a8d30d] uppercase tracking-[0.3em] font-bold">
                  MODO SIMULADOR ACTIVADO
                </span>
                <h3 className="font-display text-xl font-black text-white tracking-wider uppercase font-cinzel-forced">
                  ACCESO DE ESPECTADOR
                </h3>
                <p className="text-xs text-slate-400">
                  Dado que has declinado configurar Firebase, iniciemos una sesión simulada para que explores la interactividad en tiempo real.
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    Alias de Espectador:
                  </label>
                  <input
                    type="text"
                    value={mockName}
                    onChange={(e) => setMockName(e.target.value)}
                    placeholder="Ej. Espectador_Nocturno_99"
                    className="w-full bg-[#0d131a] border border-[#1a3a4a] focus:border-[#a8d30d] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-all font-sans"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                    Rol / Distintivo en el Circo:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { role: 'Espectador', badge: '🎟️ Espectador' },
                      { role: 'Crítico de Arte', badge: '✒️ Crítico' },
                      { role: 'Aliado Secreto', badge: '👁️ Aliado' },
                      { role: 'Makhaira Fan', badge: '🔥 Fanático' }
                    ].map((item) => (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => setMockRole(item.role)}
                        className={`py-2.5 px-3 text-xs rounded border text-left font-mono transition-all ${
                          mockRole === item.role
                            ? 'bg-[#8b0000]/25 text-white border-[#8b0000]'
                            : 'bg-[#0d131a] text-slate-400 border-[#1a3a4a] hover:border-[#4682b4]'
                        }`}
                      >
                        {item.badge}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowMockLogin(false)}
                  className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 rounded font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  CANCELAR
                </button>
                <button
                  onClick={() => {
                    const finalName = mockName.trim() || 'Espectador Anónimo';
                    const mockUserObj = {
                      uid: 'mock_' + Date.now(),
                      displayName: `${finalName} (${mockRole})`,
                      email: `${finalName.toLowerCase().replace(/[^a-z0-9]/g, '')}@makhaira.com`,
                      photoURL: ''
                    };
                    localStorage.setItem('makhaira_mock_user', JSON.stringify(mockUserObj));
                    setUser(mockUserObj as any);
                    setShowMockLogin(false);
                    setMessage({ text: `Sesión simulada iniciada como ${finalName}`, type: 'success' });
                  }}
                  className="flex-1 py-3 bg-[#8b0000] hover:bg-[#a8d30d] text-white hover:text-black font-bold border border-[#8b0000] hover:border-[#a8d30d] rounded font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  INGRESAR
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
