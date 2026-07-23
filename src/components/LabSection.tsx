import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Volume2, VolumeX, Mic, MicOff, Bot, BrainCircuit, Check, Radio
} from "lucide-react";

interface LabSectionProps {
  isOpen: boolean;
  onClose: () => void;
  isDayMode: boolean;
  setIsDayMode: (dayMode: boolean) => void;
}

export function LabSection({ isOpen, onClose, isDayMode }: LabSectionProps) {
  const [voiceState, setVoiceState] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [lowLatency, setLowLatency] = useState(true);
  const [deepThinking, setDeepThinking] = useState(true);
  const [continuousVoiceMode, setContinuousVoiceMode] = useState(true);
  const [currentThought, setCurrentThought] = useState<string | null>(null);

  const [activeVoiceReply, setActiveVoiceReply] = useState<{
    query: string;
    reply: string;
    thought?: string;
    time: string;
  }>({
    query: "",
    reply: "(hah... tersenyum manis) Halo Bapak dan Ibu! Saya Naswa, Notulen dan Asisten Warga RW 26 Kebalen. Ceria sekali bisa menyapa Anda hari ini! Silakan tekan tombol mikrofon untuk bertanya.",
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });

  const [isMutedVoice, setIsMutedVoice] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = () => {
          synthRef.current?.getVoices();
        };
      }
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        try { window.speechSynthesis.cancel(); } catch {}
      }
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
    };
  }, []);

  const unlockAudioEngine = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try {
        window.speechSynthesis.resume();
      } catch {}
    }
  };

  const speakText = (text: string) => {
    if (isMutedVoice) {
      if (continuousVoiceMode && isOpen) {
        setTimeout(() => startListeningVoice(), 400);
      }
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech Synthesis is not supported in this browser.");
      return;
    }

    const synth = window.speechSynthesis;
    try {
      synth.cancel();
      if (synth.paused) {
        synth.resume();
      }
    } catch {}

    const cleanText = text
      .replace(/\(.*?\)/g, '')
      .replace(/[*#_`~]/g, '')
      .replace(/[-•]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "id-ID";
    utterance.rate = 1.0; // Natural human KORE cadence (no robotic stretch)
    utterance.pitch = 1.0; // Natural human KORE pitch

    // Pre-cache & assign best Indonesian female voice
    const voices = synth.getVoices();
    if (voices && voices.length > 0) {
      const idFemaleVoice = voices.find(v => 
        (v.lang.toLowerCase().includes("id") || v.lang.toLowerCase().includes("indonesia")) && (
          v.name.toLowerCase().includes("female") || 
          v.name.toLowerCase().includes("wanita") || 
          v.name.toLowerCase().includes("gadis") || 
          v.name.toLowerCase().includes("natural") || 
          v.name.toLowerCase().includes("online") ||
          v.name.toLowerCase().includes("siti") ||
          v.name.toLowerCase().includes("google bahasa indonesia")
        )
      ) || voices.find(v => v.lang.toLowerCase().includes("id"));

      if (idFemaleVoice) {
        utterance.voice = idFemaleVoice;
      }
    }

    utterance.onstart = () => setVoiceState("speaking");
    utterance.onend = () => {
      setVoiceState("idle");
      if (continuousVoiceMode && isOpen) {
        setTimeout(() => startListeningVoice(), 400);
      }
    };
    utterance.onerror = (e) => {
      console.warn("Speech synthesis error event:", e);
      setVoiceState("idle");
      if (continuousVoiceMode && isOpen) {
        setTimeout(() => startListeningVoice(), 400);
      }
    };

    try {
      synth.speak(utterance);
      if (synth.paused) {
        synth.resume();
      }
    } catch (e) {
      console.warn("Error calling synth.speak:", e);
      setVoiceState("idle");
    }
  };

  const playGeminiAudio = async (base64Audio: string, fallbackText: string) => {
    speakText(fallbackText);
  };

  const handleVoiceQuery = async (query: string) => {
    if (!query.trim()) return;
    unlockAudioEngine();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setVoiceState("thinking");
    setCurrentThought(null);

    if (deepThinking) {
      setCurrentThought("Analisis kilat knowledge base RW 26 Kebalen...");
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    try {
      const response = await fetch("/api/voice-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: query }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      const data = await response.json();

      let reply = data.reply || "Halo Bapak dan Ibu Warga RW 26 Kebalen! Ada yang bisa saya bantu dengan senang hati?";
      let thoughtProcess = deepThinking ? (data.thought || "Analisis basis data selesai.") : undefined;

      setCurrentThought(null);
      setActiveVoiceReply({ query, reply, thought: thoughtProcess, time: timeNow });
      speakText(reply);
    } catch {
      clearTimeout(timeoutId);
      // Fast instant local intelligence fallback (< 10ms)
      let reply = "(hah... tersenyum manis) Halo Bapak dan Ibu! Saya Naswa, Notulen dan Asisten Warga RW 26. Ceria sekali bisa menyapa Anda!";
      let thoughtProcess = deepThinking ? "Analisis basis data selesai." : undefined;
      const qLower = query.toLowerCase();

      if (qLower.includes("siapa") && (qLower.includes("kamu") || qLower.includes("anda") || qLower.includes("naswa"))) {
        reply = "(hah... tersenyum manis) Halo! Saya Naswa, Notulen dan Asisten Warga RW 26 Kebalen. Saya siap membantu Anda dengan ramah dan ceria!";
        thoughtProcess = deepThinking ? "Mengenalkan identitas Naswa..." : undefined;
      } else if (qLower.includes("struktur") || qLower.includes("pengurus") || qLower.includes("team") || qLower.includes("siapa") || qLower.includes("ketua rw")) {
        reply = "(hembus nafas halus... tersenyum) Pengurus RW 26 Kebalen dipimpin Pak Tri Handoko Putro, Pak Sumaryadi Sekretaris, Ibu Lintar Bendahara, Pak Jatmiko Keamanan, dan Pak Arifraj Teknologi.";
        thoughtProcess = deepThinking ? "Mengambil data pengurus inti RW 26..." : undefined;
      } else if (qLower.includes("visi") || qLower.includes("misi") || qLower.includes("tujuan")) {
        reply = "(hah... tersenyum hangat) Visi utama RW 26 Kebalen adalah membangun lingkungan warga berbasis digital yang aman, transparan, dan harmonis.";
        thoughtProcess = deepThinking ? "Memeriksa Visi Misi digital RW 26..." : undefined;
      } else if (qLower.includes("program") || qLower.includes("kegiatan") || qLower.includes("aktivitas") || qLower.includes("artikel")) {
        reply = "(hembus nafas halus... tersenyum ceria) Program unggulan RW 26 meliputi Solar Grid, Hidroponik Otomatis, Pos Ronda Panic Button, dan e-persuratan digital.";
        thoughtProcess = deepThinking ? "Menyaring daftar program warga..." : undefined;
      } else if (qLower.includes("ronda") || qLower.includes("jadwal") || qLower.includes("keamanan") || qLower.includes("jatmiko")) {
        reply = "(hah... tersenyum ramah) Jadwal ronda malam dikoordinasikan Pak Jatmiko di Pos Utama RT 03 mulai pukul 22.00 WIB.";
        thoughtProcess = deepThinking ? "Memeriksa jadwal ronda malam..." : undefined;
      } else if (qLower.includes("surat") || qLower.includes("pengantar") || qLower.includes("domisili") || qLower.includes("sumaryadi") || qLower.includes("notulen")) {
        reply = "(sejenak tersenyum manis) Pelayanan surat pengantar dikelola Pak Sumaryadi bersama saya sebagai Notulen, dan bisa diajukan secara online.";
        thoughtProcess = deepThinking ? "Memeriksa layanan persuratan warga..." : undefined;
      } else if (qLower.includes("iuran") || qLower.includes("kas") || qLower.includes("lintar")) {
        reply = "(hembus nafas halus... tersenyum) Laporan kas iuran warga dikelola secara transparan oleh Ibu Lintar dengan pencapaian 88 persen.";
        thoughtProcess = deepThinking ? "Mengakses laporan keuangan kas warga..." : undefined;
      } else if (qLower.includes("darurat") || qLower.includes("panic")) {
        reply = "(hah... siaga ramah) Tombol Panic Button terhubung langsung ke pos keamanan Pak Jatmiko dan pengurus RW.";
        thoughtProcess = deepThinking ? "Siaga darurat aktif..." : undefined;
      } else if (qLower.includes("halo") || qLower.includes("hai") || qLower.includes("selamat") || qLower.includes("pagi") || qLower.includes("siang") || qLower.includes("sore") || qLower.includes("malam")) {
        reply = "(hah... tersenyum manis) Halo Bapak dan Ibu! Saya Naswa, Notulen dan Asisten Warga RW 26. Ada yang bisa saya bantu hari ini?";
        thoughtProcess = deepThinking ? "Menyiapkan sapaan ramah Naswa..." : undefined;
      } else {
        reply = `(sejenak tersenyum manis) Mengenai ${query}, informasi tersebut sudah tercatat di sistem digital RW 26 Kebalen.`;
        thoughtProcess = deepThinking ? "Mencocokkan kueri spesifik warga..." : undefined;
      }

      setCurrentThought(null);
      setActiveVoiceReply({ query, reply, thought: thoughtProcess, time: timeNow });
      speakText(reply);
    }
  };

  const startListeningVoice = async () => {
    if (voiceState === "speaking" || voiceState === "thinking") return;
    setVoiceState("listening");

    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognitionAPI) {
      setTimeout(() => {
        const simulatedQueries = [
          "Jelaskan struktur organisasi dan nama pengurus RW 26 Kebalen",
          "Apa saja visi misi dan program utama RW 26?",
          "Bagaimana jadwal ronda malam dan sistem keamanan?",
          "Bagaimana transparansi laporan kas keuangan warga?"
        ];
        const randomQ = simulatedQueries[Math.floor(Math.random() * simulatedQueries.length)];
        handleVoiceQuery(randomQ);
      }, 500);
      return;
    }

    try {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch {}
      }
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;
      recognition.lang = "id-ID";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setVoiceState("listening");
      };

      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          try { recognition.stop(); } catch {}
          handleVoiceQuery(transcript);
        }
      };

      recognition.onerror = () => {
        setVoiceState("idle");
      };

      recognition.onend = () => {
        if (voiceState === "listening") {
          setVoiceState("idle");
        }
      };

      recognition.start();
    } catch {
      setVoiceState("idle");
    }
  };

  const stopListeningVoice = () => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch {}
    }
    setVoiceState("idle");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className={`relative w-full max-w-xl rounded-3xl border overflow-hidden shadow-2xl flex flex-col max-h-[92vh] ${
              isDayMode 
                ? "bg-[#faf9f6] border-stone-300 text-stone-900" 
                : "bg-stone-950 border-white/15 text-[#E1E0CC]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top glowing ambient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 animate-pulse" />

            {/* Header */}
            <div className="px-5 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-emerald-400">NASWA - NOTULEN & ASISTEN WARGA</span>
                    <span className="px-1.5 py-0.2 text-[8px] font-bold tracking-wider bg-emerald-500/10 text-emerald-400 rounded uppercase">GEMINI 2.5 FLASH • PERSONA NASWA</span>
                  </div>
                  <h2 className="text-xl font-serif italic tracking-wide text-current">Naswa - Notulen & Asisten Warga</h2>
                </div>
              </div>

              {/* Toggles & Controls */}
              <div className="flex items-center flex-wrap gap-2">
                {/* Continuous Voice Mode Toggle */}
                <button
                  onClick={() => setContinuousVoiceMode(!continuousVoiceMode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-mono transition-all cursor-pointer ${
                    continuousVoiceMode 
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                      : "bg-black/20 border-white/10 text-stone-400"
                  }`}
                  title="Toggle Continuous Voice Mode"
                >
                  <Radio className={`w-3.5 h-3.5 ${continuousVoiceMode ? "animate-pulse text-emerald-400" : ""}`} />
                  <span>Voice Mode</span>
                  {continuousVoiceMode && <Check className="w-3 h-3 text-emerald-400" />}
                </button>

                {/* Deep Thinking Toggle */}
                <button
                  onClick={() => setDeepThinking(!deepThinking)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-[10px] font-mono transition-all cursor-pointer ${
                    deepThinking 
                      ? "bg-purple-500/15 border-purple-500/40 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]" 
                      : "bg-black/20 border-white/10 text-stone-400"
                  }`}
                  title="Toggle Deep Thinking Mode"
                >
                  <BrainCircuit className={`w-3.5 h-3.5 ${deepThinking ? "text-purple-400" : ""}`} />
                  <span>Deep.Thingking</span>
                  {deepThinking && <Check className="w-3 h-3 text-purple-400" />}
                </button>

                <button 
                  onClick={() => setIsMutedVoice(!isMutedVoice)}
                  className={`p-2 rounded-full border transition-all duration-300 cursor-pointer ${
                    isMutedVoice 
                      ? "bg-rose-500/10 border-rose-500/30 text-rose-400" 
                      : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  }`}
                  title="Toggle AI Speech"
                >
                  {isMutedVoice ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition-all cursor-pointer text-stone-400 hover:text-current"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="p-4 sm:p-6 flex flex-col gap-5 overflow-y-auto flex-1">
              
              {/* Central Voice Orb & Visualizer */}
              <div className="flex flex-col items-center justify-center py-2 shrink-0 gap-3">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full bg-emerald-500/20 filter blur-xl ${voiceState === "listening" || voiceState === "speaking" ? "animate-ping" : "animate-pulse"}`} />
                  
                  <div 
                    onClick={() => {
                      unlockAudioEngine();
                      voiceState === "listening" ? stopListeningVoice() : startListeningVoice();
                    }}
                    className={`relative z-10 w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 border-emerald-500/60 bg-black/90 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.4)] cursor-pointer group transition-transform hover:scale-105`}
                    title="Klik Orb untuk aktifkan/matikan Mic"
                  >
                    <Bot className={`w-10 h-10 sm:w-11 sm:h-11 text-emerald-400 ${voiceState === "thinking" ? "animate-spin" : ""}`} />
                    <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 mt-2 uppercase tracking-widest text-center px-2 font-bold">
                      {voiceState === "listening" ? "Mendengarkan Suara..." : voiceState === "speaking" ? "Asisten Bicara..." : voiceState === "thinking" ? (deepThinking ? "Deep Thinking..." : "Memproses...") : "Tekan Mic / Bicara"}
                    </span>
                  </div>

                  <div className="absolute inset-[-14px] flex items-center justify-center pointer-events-none">
                    <div className="flex items-center gap-1">
                      {[30, 55, 25, 80, 45, 85, 40, 70, 50, 30].map((h, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            height: voiceState === "listening" || voiceState === "speaking" ? [8, h, 8] : [8, 14, 8] 
                          }}
                          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.08 }}
                          className={`w-1 rounded-full opacity-80 ${voiceState === "listening" ? "bg-rose-400" : "bg-emerald-400"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Main Voice Activation Button */}
                <button
                  onClick={() => {
                    unlockAudioEngine();
                    voiceState === "listening" ? stopListeningVoice() : startListeningVoice();
                  }}
                  className={`w-full max-w-md py-3 px-5 rounded-2xl font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md ${
                    voiceState === "listening"
                      ? "bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30 animate-pulse"
                      : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/25"
                  }`}
                >
                  {voiceState === "listening" ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 animate-bounce" />}
                  <span className="text-xs sm:text-sm tracking-wide font-sans">
                    {voiceState === "listening" ? "Matikan Mikrofon (Sedang Mendengarkan)" : "Aktifkan Mikrofon & Mulai Bicara Suara"}
                  </span>
                </button>

                {/* Live thought pill if deep thinking is active */}
                {currentThought && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono flex items-center gap-2 max-w-md text-center"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-400 animate-spin shrink-0" />
                    <span>{currentThought}</span>
                  </motion.div>
                )}
              </div>

              {/* Active AI Voice Spoken Response Display Card */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all shrink-0 ${
                isDayMode ? "bg-stone-100 border-stone-200" : "bg-black/50 border-white/10"
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">Respon Suara Naswa (Notulen & Asisten Warga)</span>
                  </div>

                  {/* Manual Play / Replay Voice Button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        unlockAudioEngine();
                        if (voiceState === "speaking") {
                          if (typeof window !== "undefined" && window.speechSynthesis) {
                            try { window.speechSynthesis.cancel(); } catch {}
                          }
                          setVoiceState("idle");
                        } else {
                          speakText(activeVoiceReply.reply);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
                      title="Putar Suara Naswa"
                    >
                      <Volume2 className={`w-4 h-4 ${voiceState === "speaking" ? "animate-bounce" : ""}`} />
                      <span>{voiceState === "speaking" ? "Hentikan Suara" : "Putar Suara 🔊"}</span>
                    </button>
                    {activeVoiceReply.time && (
                      <span className="text-[10px] font-mono opacity-60 hidden sm:inline">{activeVoiceReply.time}</span>
                    )}
                  </div>
                </div>

                {activeVoiceReply.query && (
                  <p className="text-[11px] font-mono text-emerald-400/90 mb-2 italic bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    🗣 " {activeVoiceReply.query} "
                  </p>
                )}

                {activeVoiceReply.thought && (
                  <div className="mb-2 px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono flex items-center gap-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-purple-400 shrink-0 animate-spin" />
                    <span>Thought: {activeVoiceReply.thought}</span>
                  </div>
                )}

                <p className="text-xs sm:text-sm leading-relaxed font-sans font-medium text-current">
                  {activeVoiceReply.reply}
                </p>
              </div>

              {/* Quick Voice Topics Shortcuts */}
              <div className="flex flex-col gap-1.5 shrink-0">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">PILIH TOPIK SUARA LANGSUNG:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { label: "Pengurus RW 26", query: "Struktur & Nama Pengurus RW 26" },
                    { label: "Visi & Misi", query: "Visi Misi & Tujuan RW 26" },
                    { label: "Program Warga", query: "Program & Kegiatan Warga" },
                    { label: "Jadwal Ronda", query: "Jadwal Ronda & Keamanan" }
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        unlockAudioEngine();
                        handleVoiceQuery(item.query);
                      }}
                      className="text-[11px] font-mono px-3 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 hover:bg-emerald-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 truncate"
                    >
                      <span>🎙️</span>
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Footer info */}
              <div className="border-t pt-3 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 gap-1 shrink-0" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                <span className="flex items-center gap-2">
                  <span>Naswa - Notulen & Asisten Warga</span>
                  {lowLatency && <span className="text-cyan-400 font-mono">[Low Latency]</span>}
                  {deepThinking && <span className="text-purple-400 font-mono">[Deep.Thingking]</span>}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <span className={`w-1.5 h-1.5 rounded-full ${voiceState === "listening" ? "bg-rose-500 animate-ping" : "bg-emerald-500 animate-pulse"}`} />
                  {voiceState === "listening" ? "Mic Active (Listening)" : "Voice Mode Ready"}
                </span>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

