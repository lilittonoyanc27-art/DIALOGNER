import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneCall, 
  Play, 
  CheckCircle2, 
  RotateCcw,
  Trophy,
  Users,
  Music,
  Dribbble,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DialogueLine {
  id: string;
  speaker: 'Gor' | 'Gayane';
  text: string;
  translation: string;
}

const PHONE_DIALOGUE: DialogueLine[] = [
  { id: '1', speaker: 'Gor', text: "¡Hola Gayane! ¿Cómo estás?", translation: "Ողջույն Գայանե: Ինչպե՞ս ես" },
  { id: '2', speaker: 'Gayane', text: "¡Hola Gor! Estoy bien, gracias. ¿Y tú?", translation: "Ողջույն Գոռ: Ես լավ եմ, շնորհակալություն։ Իսկ դու" },
  { id: '3', speaker: 'Gor', text: "También estoy bien. ¿Qué estás haciendo ahora?", translation: "Ես նույնպես լավ եմ։ Ինչ ես անում հիմա" },
  { id: '4', speaker: 'Gayane', text: "Estoy en casa, descansando un poco.", translation: "Ես տանը եմ, մի փոքր հանգստանում" },
  { id: '5', speaker: 'Gor', text: "Ah, genial. Yo estoy en el parque con mis amigos.", translation: "Ահ, լավ է։ Ես ընկերներիս հետ եմ այգում" },
  { id: '6', speaker: 'Gayane', text: "¡Qué divertido! ¿Se están divirtiendo mucho?", translation: "Ինչ զվարճալի է։ Նրանք շատ են զվարճանում՞" },
  { id: '7', speaker: 'Gor', text: "Sí, estamos jugando fútbol y estamos muy contentos.", translation: "Այո, մենք ֆուտբոլ ենք խաղում և շատ ուրախ ենք" },
  { id: '8', speaker: 'Gayane', text: "Me alegro. Yo también quiero salir un rato.", translation: "Ուրախ եմ։ Ես էլ եմ ուզում մի փոքր դուրս գալ" },
  { id: '9', speaker: 'Gor', text: "Cuando quieras, podemos encontrarnos.", translation: "Երբ ուզես, կարող ենք հանդիպել" },
  { id: '10', speaker: 'Gayane', text: "Perfecto, hablamos más tarde.", translation: "Իդեալական է, ավելի ուշ կխոսենք" },
  { id: '11', speaker: 'Gor', text: "¡Hasta luego!", translation: "Մինչ հանդիպում" },
  { id: '12', speaker: 'Gayane', text: "¡Hasta luego!", translation: "Մինչ հանդիպում" },
];

export default function PhoneDialogueApp() {
  const [view, setView] = useState<'dialogue' | 'game' | 'result'>('dialogue');
  const [shuffledSpanish, setShuffledSpanish] = useState<DialogueLine[]>([]);
  const [shuffledArmenian, setShuffledArmenian] = useState<DialogueLine[]>([]);
  const [selectedSpanish, setSelectedSpanish] = useState<string | null>(null);
  const [selectedArmenian, setSelectedArmenian] = useState<string | null>(null);
  const [matches, setMatches] = useState<Set<string>>(new Set());
  const [wrongMatch, setWrongMatch] = useState<boolean>(false);

  useEffect(() => {
    if (view === 'game') {
      const spanish = [...PHONE_DIALOGUE].sort(() => Math.random() - 0.5);
      const armenian = [...PHONE_DIALOGUE].sort(() => Math.random() - 0.5);
      setShuffledSpanish(spanish);
      setShuffledArmenian(armenian);
      setMatches(new Set());
      setSelectedSpanish(null);
      setSelectedArmenian(null);
    }
  }, [view]);

  useEffect(() => {
    if (selectedSpanish && selectedArmenian) {
      if (selectedSpanish === selectedArmenian) {
        const newMatches = new Set(matches);
        newMatches.add(selectedSpanish);
        setMatches(newMatches);
        setSelectedSpanish(null);
        setSelectedArmenian(null);
        
        if (newMatches.size === PHONE_DIALOGUE.length) {
          setTimeout(() => setView('result'), 800);
        }
      } else {
        setWrongMatch(true);
        setTimeout(() => {
          setWrongMatch(false);
          setSelectedSpanish(null);
          setSelectedArmenian(null);
        }, 1000);
      }
    }
  }, [selectedSpanish, selectedArmenian, matches]);

  const reset = () => {
    setView('dialogue');
    setMatches(new Set());
    setSelectedSpanish(null);
    setSelectedArmenian(null);
  };

  return (
    <div className="min-h-screen bg-indigo-50 text-slate-900 font-sans pb-24">
      {/* Header */}
      <header className="bg-white border-b-4 border-indigo-100 px-6 py-8 shadow-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg rotate-3">
              <PhoneCall className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-indigo-600 leading-none">ՀԵՌԱԽՈՍԱԶԱՆԳ</h1>
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mt-1">Գոռ և Գայանե</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 mt-4">
        <AnimatePresence mode="wait">
          {view === 'dialogue' && (
            <motion.div 
              key="dialogue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-[40px] border-4 border-indigo-200 shadow-xl space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-block p-3 bg-indigo-50 rounded-2xl mb-2">
                    <Phone className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-3xl font-black text-indigo-500 uppercase italic tracking-tight">ԻՆՉՊԵ՞Ս ԱՆՑԱՎ ՕՐԸ</h2>
                  <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">Լսենք հեռախոսազրույցը</p>
                </div>

                <div className="space-y-4 relative">
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-50 -translate-x-1/2 hidden md:block" />
                  
                  {PHONE_DIALOGUE.map((line, idx) => (
                    <motion.div 
                      key={line.id}
                      initial={{ opacity: 0, x: line.speaker === 'Gor' ? -30 : 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.15 }}
                      className={`flex flex-col ${line.speaker === 'Gor' ? 'items-start' : 'items-end'}`}
                    >
                      <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm relative ${line.speaker === 'Gor' ? 'bg-indigo-50 border-2 border-indigo-100 rounded-bl-none' : 'bg-pink-50 border-2 border-pink-100 rounded-br-none'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{line.speaker}</span>
                          {line.id === '7' && <Dribbble className="w-3 h-3 text-sky-400" />}
                          {line.id === '5' && <Users className="w-3 h-3 text-indigo-400" />}
                          {line.id === '4' && <Music className="w-3 h-3 text-pink-400" />}
                        </div>
                        <p className="text-lg font-black text-slate-800 italic leading-tight">{line.text}</p>
                        <p className="text-sm font-bold text-slate-500 mt-2 border-t border-indigo-100/50 pt-2">«{line.translation}»</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={() => setView('game')}
                  className="w-full bg-indigo-500 text-white p-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-indigo-600 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Play className="w-6 h-6" /> ԽԱՂԱԼ ԹԱՐԳՄԱՆՈՒԹՅՈՒՆ
                </button>
              </div>
            </motion.div>
          )}

          {view === 'game' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="bg-white p-8 rounded-[40px] border-4 border-indigo-100 shadow-xl space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-black text-indigo-600 uppercase italic">ԳՏԻՐ ԹԱՐԳՄԱՆՈՒԹՅՈՒՆԸ</h2>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Միացրու իսպաներեն նախադասությունը հայերեն թարգմանության հետ</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Spanish Column */}
                  <div className="space-y-3">
                    <h3 className="text-center font-black text-indigo-400 uppercase text-xs tracking-[0.2em] mb-4">Español</h3>
                    {shuffledSpanish.map((item) => (
                      <button
                        key={`es-${item.id}`}
                        disabled={matches.has(item.id) || (wrongMatch && selectedSpanish === item.id)}
                        onClick={() => setSelectedSpanish(item.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all font-black text-sm relative overflow-hidden
                          ${matches.has(item.id) ? 'bg-green-50 border-green-200 text-green-600 opacity-50 cursor-default' : 
                            selectedSpanish === item.id ? (wrongMatch ? 'bg-red-50 border-red-400 text-red-600 animate-shake' : 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-[1.02]') : 
                            'bg-white border-indigo-50 text-slate-700 hover:border-indigo-200 shadow-sm'}
                        `}
                      >
                        {item.text}
                        {matches.has(item.id) && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
                      </button>
                    ))}
                  </div>

                  {/* Armenian Column */}
                  <div className="space-y-3">
                    <h3 className="text-center font-black text-pink-400 uppercase text-xs tracking-[0.2em] mb-4">Հայերեն</h3>
                    {shuffledArmenian.map((item) => (
                      <button
                        key={`hy-${item.id}`}
                        disabled={matches.has(item.id) || (wrongMatch && selectedArmenian === item.id)}
                        onClick={() => setSelectedArmenian(item.id)}
                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all font-bold text-sm relative overflow-hidden
                          ${matches.has(item.id) ? 'bg-green-50 border-green-200 text-green-600 opacity-50 cursor-default' : 
                            selectedArmenian === item.id ? (wrongMatch ? 'bg-red-50 border-red-400 text-red-600 animate-shake' : 'bg-pink-600 border-pink-600 text-white shadow-lg scale-[1.02]') : 
                            'bg-white border-pink-50 text-slate-700 hover:border-pink-200 shadow-sm'}
                        `}
                      >
                        {item.translation}
                        {matches.has(item.id) && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-indigo-50">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-indigo-100 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(matches.size / PHONE_DIALOGUE.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-black text-indigo-400 uppercase">{matches.size} / {PHONE_DIALOGUE.length}</span>
                  </div>
                  <button onClick={reset} className="text-slate-400 hover:text-indigo-500 transition-colors">
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[56px] border-4 border-indigo-100 shadow-2xl text-center space-y-8"
            >
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-12 h-12 text-indigo-600" />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-black text-slate-900 uppercase italic tracking-tighter">ԿԵՑՑԵՍ</h3>
                <p className="text-slate-500 font-bold text-lg">Դու ճիշտ գտար բոլոր թարգմանությունները:</p>
              </div>
              
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={reset}
                className="w-full bg-indigo-500 text-white p-6 rounded-3xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl hover:bg-indigo-600 transition-colors"
              >
                <RotateCcw className="w-6 h-6" /> ԿՐԿՆԵԼ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
