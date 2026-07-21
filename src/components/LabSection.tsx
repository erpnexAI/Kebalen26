import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Sliders, Sun, Moon, Sparkles, Clipboard, Check, Activity, Cpu, 
  Layers, Volume2, VolumeX, Eye, Flame, Compass, RefreshCw, MapPin, Radio, Shield
} from "lucide-react";

interface LabSectionProps {
  isOpen: boolean;
  onClose: () => void;
  isDayMode: boolean;
  setIsDayMode: (dayMode: boolean) => void;
}

type ActiveTab = "glass" | "atmosphere" | "radar";

export function LabSection({ isOpen, onClose, isDayMode, setIsDayMode }: LabSectionProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("glass");
  const [copied, setCopied] = useState(false);
  const [ambientSound, setAmbientSound] = useState(false);

  // Tab 1: Glassmorphism Playground States
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(25);
  const [borderOpacity, setBorderOpacity] = useState(20);
  const [borderRadius, setBorderRadius] = useState(24);
  const [glassColor, setGlassColor] = useState<"light" | "dark" | "emerald">("dark");

  // Tab 2: Atmosphere Simulator States
  const [timeOfDay, setTimeOfDay] = useState<number>(18); // 0-24 hour scale
  const [particleDensity, setParticleDensity] = useState(20);

  // Tab 3: Innovation Radar States
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [radarRotating, setRadarRotating] = useState(true);

  // Auto transition day/night mode when sliding time of day
  useEffect(() => {
    if (activeTab === "atmosphere") {
      const isDay = timeOfDay >= 6 && timeOfDay < 18;
      if (isDay !== isDayMode) {
        setIsDayMode(isDay);
      }
    }
  }, [timeOfDay, activeTab, isDayMode, setIsDayMode]);

  const projects = [
    {
      id: 1,
      title: "Smart RW 26 Portal",
      desc: "Portal warga berbasis web terintegrasi untuk pelayanan surat pengantar mandiri, pencatatan iuran transparan, dan Panic Button darurat.",
      status: "Production Ready",
      tech: "React, Firebase",
      progress: 95,
      impact: "Tinggi"
    },
    {
      id: 2,
      title: "Recycle IoT Bin",
      desc: "Tempat sampah pintar yang memilah sampah organik dan non-organik secara mandiri menggunakan sensor induktif dan ultrasonik.",
      status: "Prototyping",
      tech: "ESP32, MicroPython",
      progress: 60,
      impact: "Sedang"
    },
    {
      id: 3,
      title: "Solar Balai Power Grid",
      desc: "Sistem panel surya pintar 2.5KWp di atap Balai Warga untuk efisiensi energi berkelanjutan hingga 45%.",
      status: "Pendanaan",
      tech: "Photovoltaic, IoT Monitor",
      progress: 40,
      impact: "Tinggi"
    },
    {
      id: 4,
      title: "CCTV AI Alert System",
      desc: "Keamanan berbasis kecerdasan buatan untuk deteksi anomali lingkungan di titik vital RW secara seketika.",
      status: "Beta Testing",
      tech: "TensorFlow, OpenCV",
      progress: 80,
      impact: "Tinggi"
    }
  ];

  // Glassmorphism Code Generator
  const generateTailwindCode = () => {
    const bgClass = glassColor === "light" 
      ? `bg-white/${opacity}` 
      : glassColor === "emerald" 
        ? `bg-emerald-500/${opacity}` 
        : `bg-black/${opacity}`;
    const borderClass = `border-white/${borderOpacity}`;
    const blurClass = `backdrop-blur-[${blur}px]`;
    const radiusClass = borderRadius === 12 ? "rounded-xl" : borderRadius === 16 ? "rounded-2xl" : borderRadius === 24 ? "rounded-3xl" : "rounded-none";
    
    return `className="p-6 ${bgClass} border ${borderClass} ${blurClass} ${radiusClass} shadow-2xl"`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateTailwindCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAtmosphereTheme = () => {
    if (timeOfDay >= 5 && timeOfDay < 9) {
      return {
        name: "Fajar (Sunrise)",
        bg: "from-amber-500/20 via-pink-600/20 to-indigo-900/40",
        tint: "rgba(245, 158, 11, 0.1)",
        description: "Suasana pagi Kebalen yang menyegarkan dengan pancaran fajar keemasan hangat.",
        imageOverlay: "bg-amber-500/10"
      };
    } else if (timeOfDay >= 9 && timeOfDay < 16) {
      return {
        name: "Siang (Midday)",
        bg: "from-sky-400/10 via-teal-300/10 to-indigo-800/10",
        tint: "rgba(56, 189, 248, 0.05)",
        description: "Pancaran matahari penuh yang optimal untuk asupan energi Solar Panel Balai.",
        imageOverlay: "bg-sky-400/5"
      };
    } else if (timeOfDay >= 16 && timeOfDay < 19) {
      return {
        name: "Senja (Sunset)",
        bg: "from-orange-600/30 via-red-600/20 to-purple-950/40",
        tint: "rgba(234, 88, 12, 0.15)",
        description: "Keindahan langit lembayung senja di atas gedung serbaguna RW26.",
        imageOverlay: "bg-orange-500/20"
      };
    } else {
      return {
        name: "Malam (Night)",
        bg: "from-[#020205]/80 via-purple-950/25 to-[#000000]/90",
        tint: "rgba(107, 33, 168, 0.08)",
        description: "Malam syahdu bertabur bintang, sunyi dan tenang di lingkungan Kebalen.",
        imageOverlay: "bg-indigo-950/40"
      };
    }
  };

  const atmosphere = getAtmosphereTheme();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="lab-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 overflow-y-auto backdrop-blur-2xl bg-black/80 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans text-[#E1E0CC]"
        >
          {/* Main Lab Screen Layout */}
          <motion.div
            initial={{ scale: 0.96, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 40, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 120 }}
            className={`relative w-full max-w-6xl rounded-[32px] overflow-hidden shadow-[0_32px_100px_rgba(0,0,0,0.9)] border transition-all duration-500 ${
              isDayMode 
                ? "bg-stone-50 border-stone-200/50 text-stone-900" 
                : "bg-neutral-950 border-white/5 text-[#E1E0CC]"
            }`}
          >
            {/* Ambient Background Glow matching simulated atmosphere */}
            <div className={`absolute inset-0 bg-gradient-to-tr ${atmosphere.bg} pointer-events-none transition-all duration-1000 opacity-60`} />

            {/* Main Content Split Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[640px] max-h-[92vh] overflow-y-auto lg:overflow-hidden">
              
              {/* LEFT COLUMN: Premium Image Box (Kotak Gambar) */}
              <div className="lg:col-span-5 relative border-b lg:border-b-0 lg:border-r border-white/10 overflow-hidden flex flex-col justify-between p-6 sm:p-8 min-h-[300px] lg:min-h-0 bg-black/40">
                {/* Tech Blueprint Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                {/* The Main High-End Image Container */}
                <div className="absolute inset-0 z-0">
                  <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{ duration: 1.5 }}
                    className="w-full h-full bg-cover bg-center"
                    style={{ 
                      backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800')" 
                    }}
                  />
                  {/* Atmospheric Color overlay adapting dynamically */}
                  <div className={`absolute inset-0 transition-colors duration-1000 ${atmosphere.imageOverlay}`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40" />
                </div>

                {/* Left Card Top Info */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-stone-300">Balai Warga RW 26</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] tracking-widest uppercase font-bold text-emerald-400">OPERASIONAL</span>
                  </div>
                </div>

                {/* Left Card Middle Art/Quotes */}
                <div className="relative z-10 my-12 text-left space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] tracking-widest font-bold text-stone-400 uppercase">EKSPLORASI ESTETIS</span>
                    <h3 className="text-3xl sm:text-4xl font-serif italic text-white leading-tight">
                      Lembayung <br />
                      <span className="text-emerald-300 font-serif">Arsitektur Digital</span>
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed max-w-sm">
                    "Menyatukan kehangatan ruang sosial masyarakat Kebalen dengan kesederhanaan inovasi teknologi modern secara harmonis."
                  </p>
                </div>

                {/* Left Card Bottom Telemetry Widgets */}
                <div className="relative z-10 border-t border-white/10 pt-6 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <span className="text-[8px] text-stone-400 uppercase tracking-widest font-bold block mb-1">Integrasi</span>
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-xs font-mono font-bold text-white">SINKRON</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                      <span className="text-[8px] text-stone-400 uppercase tracking-widest font-bold block mb-1">Konektivitas</span>
                      <div className="flex items-center gap-1.5">
                        <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                        <span className="text-xs font-mono font-bold text-white">AKTIF</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-stone-500 font-mono">
                    <span>ESTABLISHED 2026</span>
                    <span>LAT: -6.2144° S | LON: 106.8456° E</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Frosted Glassmorphism Box (Kotak Glassform) */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto max-h-[85vh] lg:max-h-none">
                
                {/* Header inside Glassmorphism Box */}
                <div className="flex items-center justify-between border-b pb-5 transition-colors duration-300" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                      <Cpu className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500">Ruang Eksperimen</span>
                        <span className="px-1.5 py-0.5 text-[8px] font-bold tracking-wider bg-emerald-500/10 text-emerald-500 rounded uppercase">v2.6</span>
                      </div>
                      <h2 className="text-2xl font-serif italic tracking-wide text-current">Kebalen Digital Lab</h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Audio Toggle */}
                    <button 
                      onClick={() => setAmbientSound(!ambientSound)}
                      className={`p-2.5 rounded-full border transition-all duration-300 cursor-pointer ${
                        ambientSound 
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500" 
                          : "bg-black/5 border-black/10 text-stone-400 hover:text-stone-600 dark:bg-white/5 dark:border-white/10 dark:text-stone-400 dark:hover:text-stone-200"
                      }`}
                      title="Toggle Ambient Audio Feed"
                    >
                      {ambientSound ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                    
                    {/* Close Trigger */}
                    <button
                      onClick={onClose}
                      className="p-2.5 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 transition-all cursor-pointer text-stone-400 hover:text-current"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Elegant Glassmorphic Segmented Control for Tabs */}
                <div className="my-6 p-1.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex gap-1 sm:gap-2">
                  <button
                    onClick={() => setActiveTab("glass")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === "glass"
                        ? "bg-white dark:bg-stone-900 shadow-md border border-black/5 dark:border-white/10 text-emerald-500"
                        : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Playground Kaca</span>
                    <span className="sm:hidden">Kaca</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("atmosphere")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === "atmosphere"
                        ? "bg-white dark:bg-stone-900 shadow-md border border-black/5 dark:border-white/10 text-amber-500"
                        : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Simulasi Atmosfer</span>
                    <span className="sm:hidden">Atmosfer</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("radar")}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                      activeTab === "radar"
                        ? "bg-white dark:bg-stone-900 shadow-md border border-black/5 dark:border-white/10 text-sky-500"
                        : "text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200"
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Radar RW 26</span>
                    <span className="sm:hidden">Radar</span>
                  </button>
                </div>

                {/* Sub Tab Workspace Section */}
                <div className="flex-1 min-h-[360px] flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    
                    {/* TAB 1: GLASSMORPHISM WORKSPACE */}
                    {activeTab === "glass" && (
                      <motion.div
                        key="glass-workspace"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                          {/* Controls Box */}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-serif italic text-lg text-current">Konfigurasi Kaca</h4>
                              <p className="text-[11px] text-stone-500">Sesuaikan tingkat keburaman, transparansi, dan lengkungan material kaca.</p>
                            </div>

                            {/* Color Picker */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Warna Dasar</span>
                              <div className="flex gap-1.5">
                                {["dark", "light", "emerald"].map((col) => (
                                  <button
                                    key={col}
                                    onClick={() => setGlassColor(col as any)}
                                    className={`flex-1 py-1.5 px-2.5 rounded-lg border text-[10px] font-semibold tracking-wide transition-all cursor-pointer capitalize ${
                                      glassColor === col
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 font-bold"
                                        : "bg-black/5 dark:bg-white/5 border-transparent text-stone-500"
                                    }`}
                                  >
                                    {col === "dark" ? "Gelap" : col === "light" ? "Terang" : "Zamrud"}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Slider: Opacity */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-stone-400 uppercase">Transparansi</span>
                                <span className="text-emerald-500">{opacity}%</span>
                              </div>
                              <input
                                type="range"
                                min="10"
                                max="90"
                                value={opacity}
                                onChange={(e) => setOpacity(Number(e.target.value))}
                                className="w-full accent-emerald-500 bg-black/10 dark:bg-white/10 h-1 rounded-full cursor-pointer"
                              />
                            </div>

                            {/* Slider: Blur */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-stone-400 uppercase">Keburaman</span>
                                <span className="text-emerald-500">{blur}px</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="40"
                                value={blur}
                                onChange={(e) => setBlur(Number(e.target.value))}
                                className="w-full accent-emerald-500 bg-black/10 dark:bg-white/10 h-1 rounded-full cursor-pointer"
                              />
                            </div>

                            {/* Slider: Border */}
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-stone-400 uppercase">Kilau Tepi</span>
                                <span className="text-emerald-500">{borderOpacity}%</span>
                              </div>
                              <input
                                type="range"
                                min="5"
                                max="50"
                                value={borderOpacity}
                                onChange={(e) => setBorderOpacity(Number(e.target.value))}
                                className="w-full accent-emerald-500 bg-black/10 dark:bg-white/10 h-1 rounded-full cursor-pointer"
                              />
                            </div>

                            {/* Radius select */}
                            <div className="space-y-1.5">
                              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Kelengkungan</span>
                              <div className="flex gap-1.5">
                                {[12, 16, 24].map((r) => (
                                  <button
                                    key={r}
                                    onClick={() => setBorderRadius(r)}
                                    className={`flex-1 py-1.5 px-2 rounded-lg border text-[10px] font-mono transition-all cursor-pointer ${
                                      borderRadius === r
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500 font-bold"
                                        : "bg-black/5 dark:bg-white/5 border-transparent text-stone-500"
                                    }`}
                                  >
                                    {r}px
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Preview Box Card */}
                          <div className="relative rounded-2xl border border-black/5 dark:border-white/5 bg-black/20 dark:bg-black/50 overflow-hidden flex flex-col justify-center p-4 min-h-[220px]">
                            {/* Decorative background spots */}
                            <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 filter blur-xl animate-pulse pointer-events-none" />
                            <div className="absolute bottom-8 right-8 w-24 h-24 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 filter blur-2xl animate-bounce pointer-events-none" style={{ animationDuration: '7s' }} />

                            {/* Dynamic Live Glass Container */}
                            <div 
                              className="relative z-10 w-full transition-all duration-300 shadow-xl"
                              style={{
                                backdropFilter: `blur(${blur}px)`,
                                WebkitBackdropFilter: `blur(${blur}px)`,
                                backgroundColor: glassColor === "light" 
                                  ? `rgba(255, 255, 255, ${opacity / 100})` 
                                  : glassColor === "emerald"
                                    ? `rgba(16, 185, 129, ${opacity / 100})`
                                    : `rgba(0, 0, 0, ${opacity / 100})`,
                                border: `1px solid ${isDayMode ? `rgba(0, 0, 0, ${borderOpacity / 100})` : `rgba(255, 255, 255, ${borderOpacity / 100})`}`,
                                borderRadius: `${borderRadius}px`
                              }}
                            >
                              <div className="p-5 space-y-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h5 className="font-serif italic text-lg text-white">BALAI WARGA</h5>
                                    <p className="text-[8px] tracking-widest font-bold uppercase text-emerald-400">KEBALEN RW 26</p>
                                  </div>
                                  <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '10s' }} />
                                </div>
                                <p className="text-[11px] text-stone-200/90 leading-relaxed font-light">
                                  "Menggabungkan fungsionalitas murni dengan estetika minimalis modern di lingkungan warga."
                                </p>
                                <div className="border-t border-white/10 pt-2 flex justify-between text-[8px] text-stone-400 font-mono">
                                  <span>EST. 2026</span>
                                  <span>SIMULASI PREVIEW</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Code output card */}
                        <div className="p-3.5 rounded-xl bg-black/10 dark:bg-black/55 border border-black/5 dark:border-white/5 font-mono text-xs flex items-center justify-between gap-4">
                          <div className="overflow-x-auto text-emerald-500 whitespace-nowrap scrollbar-thin flex-1 text-[11px]">
                            <span className="text-stone-500">{"<div "}</span>
                            <span className="text-emerald-400">{generateTailwindCode()}</span>
                            <span className="text-stone-500">{">"}</span>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 text-emerald-500 transition-all active:scale-95 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                          >
                            {copied ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>SALIN!</span>
                              </>
                            ) : (
                              <>
                                <Clipboard className="w-3 h-3" />
                                <span>SALIN CSS</span>
                              </>
                            )}
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: ATMOSPHERE SIMULATOR */}
                    {activeTab === "atmosphere" && (
                      <motion.div
                        key="atmosphere-workspace"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                          {/* Controls Pane */}
                          <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                            <div>
                              <h4 className="font-serif italic text-lg text-current">Siklus Jagat Raya</h4>
                              <p className="text-[11px] text-stone-500">Sesuaikan waktu untuk mengubah suasana tata cahaya dan kelembaban lingkungan.</p>
                            </div>

                            {/* TimeOfDay Slider */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-stone-400 uppercase tracking-wider">Jam Simulasi</span>
                                <span className="text-amber-500 font-mono">{timeOfDay.toString().padStart(2, "0")}:00 WIB</span>
                              </div>
                              <input
                                type="range"
                                min="0"
                                max="23"
                                value={timeOfDay}
                                onChange={(e) => setTimeOfDay(Number(e.target.value))}
                                className="w-full accent-amber-500 bg-black/10 dark:bg-white/10 h-1 rounded-full cursor-pointer"
                              />
                              <div className="flex justify-between text-[9px] text-stone-500 font-bold">
                                <span>00:00</span>
                                <span>06:00</span>
                                <span>12:00</span>
                                <span>18:00</span>
                              </div>
                            </div>

                            {/* Dust Density Slider */}
                            <div className="space-y-1.5">
                              <div className="flex justify-between text-[11px] font-semibold">
                                <span className="text-stone-400 uppercase tracking-wider">Partikel Debu Cahaya</span>
                                <span className="text-amber-500">{particleDensity} Pcs</span>
                              </div>
                              <input
                                type="range"
                                min="5"
                                max="35"
                                value={particleDensity}
                                onChange={(e) => setParticleDensity(Number(e.target.value))}
                                className="w-full accent-amber-500 bg-black/10 dark:bg-white/10 h-1 rounded-full cursor-pointer"
                              />
                            </div>

                            {/* Atmosphere Status Details */}
                            <div className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1.5">
                              <div className="flex items-center gap-2">
                                {timeOfDay >= 6 && timeOfDay < 18 ? (
                                  <Sun className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '24s' }} />
                                ) : (
                                  <Moon className="w-4 h-4 text-indigo-400" />
                                )}
                                <h5 className="font-serif italic text-current font-bold text-sm">{atmosphere.name}</h5>
                              </div>
                              <p className="text-[11px] text-stone-500 leading-relaxed font-light">
                                {atmosphere.description}
                              </p>
                            </div>
                          </div>

                          {/* Dynamic Visualizer Canvas */}
                          <div className="md:col-span-7 relative rounded-2xl border border-black/5 dark:border-white/5 h-64 overflow-hidden flex flex-col justify-center items-center bg-stone-900">
                            {/* Visualizer Atmosphere gradient backdrop */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${atmosphere.bg} transition-all duration-1000`} />
                            
                            {/* Radial blueprint circle decoration */}
                            <div className="absolute w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
                            <div className="absolute w-32 h-32 rounded-full border border-white/5 pointer-events-none" />
                            <div className="absolute w-16 h-16 rounded-full border border-white/5 pointer-events-none" />

                            {/* Floating Sun / Moon in Solar Simulation path */}
                            <motion.div 
                              className="absolute z-10 flex flex-col items-center pointer-events-none"
                              style={{
                                top: `${35 + Math.sin((timeOfDay - 6) * Math.PI / 12) * -22}%`,
                                left: `${15 + (timeOfDay / 24) * 70}%`,
                              }}
                              animate={{ scale: [0.97, 1.03, 0.97] }}
                              transition={{ repeat: Infinity, duration: 4 }}
                            >
                              {timeOfDay >= 6 && timeOfDay < 18 ? (
                                <div className="w-8 h-8 rounded-full bg-amber-400/90 shadow-[0_0_25px_rgba(245,158,11,0.5)] flex items-center justify-center">
                                  <Sun className="w-4 h-4 text-amber-950 animate-spin" style={{ animationDuration: '30s' }} />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-indigo-100/95 shadow-[0_0_20px_rgba(255,255,255,0.4)] flex items-center justify-center">
                                  <Moon className="w-3 h-3 text-stone-800" />
                                </div>
                              )}
                            </motion.div>

                            {/* Flying ambient particles */}
                            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                              {Array.from({ length: particleDensity }).map((_, i) => {
                                const size = Math.random() * 3 + 1.2;
                                const delay = Math.random() * 4;
                                const duration = Math.random() * 7 + 5;
                                
                                return (
                                  <motion.div
                                    key={i}
                                    className="absolute rounded-full bg-white/35"
                                    style={{
                                      width: size,
                                      height: size,
                                      left: `${Math.random() * 100}%`,
                                      bottom: `${Math.random() * 100}%`,
                                    }}
                                    animate={{
                                      y: [-10, -110],
                                      x: [0, (Math.random() - 0.5) * 30],
                                      opacity: [0, 0.6, 0]
                                    }}
                                    transition={{
                                      repeat: Infinity,
                                      duration: duration,
                                      delay: delay,
                                      ease: "linear"
                                    }}
                                  />
                                );
                              })}
                            </div>

                            {/* Equalizer Resonant bar indicator */}
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/45 backdrop-blur-md border border-white/5 rounded-xl px-3.5 py-2.5 z-10">
                              <div className="flex items-center gap-1.5">
                                <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                                <span className="text-[9px] uppercase font-bold tracking-widest text-stone-300">Frekuensi Resonansi</span>
                              </div>
                              <div className="flex gap-0.5 items-end h-3">
                                {Array.from({ length: 12 }).map((_, i) => {
                                  const delay = i * 0.08;
                                  const heightMultiplier = Math.random() * 8 + 3;
                                  return (
                                    <motion.div
                                      key={i}
                                      className="w-0.5 rounded-full bg-emerald-400/70"
                                      animate={{ height: [3, heightMultiplier, 3] }}
                                      transition={{ repeat: Infinity, duration: 1.1, delay: delay }}
                                    />
                                  );
                                })}
                              </div>
                            </div>

                            <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-widest text-white/40">SIMULATOR LINGKUNGAN</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 3: INNOVATION RADAR */}
                    {activeTab === "radar" && (
                      <motion.div
                        key="radar-workspace"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
                          {/* Left: Sweeper Radar visual */}
                          <div className="md:col-span-5 flex flex-col items-center justify-center">
                            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center overflow-hidden bg-stone-900/40 dark:bg-black/40">
                              {/* Concentric circles */}
                              <div className="absolute w-36 h-36 rounded-full border border-black/5 dark:border-white/5" />
                              <div className="absolute w-24 h-24 rounded-full border border-black/5 dark:border-white/5" />
                              <div className="absolute w-12 h-12 rounded-full border border-black/5 dark:border-white/5" />
                              
                              {/* Axis cross */}
                              <div className="absolute w-full h-[1px] bg-black/5 dark:bg-white/5" />
                              <div className="absolute h-full w-[1px] bg-black/5 dark:bg-white/5" />

                              {/* Glowing Scanbeam */}
                              <motion.div 
                                className="absolute w-1/2 h-1/2 origin-bottom-right bottom-1/2 right-1/2 bg-gradient-to-br from-transparent to-sky-500/20 border-r border-sky-400/20"
                                animate={radarRotating ? { rotate: 360 } : {}}
                                transition={{ repeat: Infinity, duration: 4.5, ease: "linear" }}
                              />

                              {/* Project 1 Dot */}
                              <button
                                onClick={() => { setSelectedProject(1); setRadarRotating(false); }}
                                className="absolute w-3 h-3 rounded-full bg-emerald-400 border border-white shadow-[0_0_10px_#10b981] cursor-pointer hover:scale-125 z-10 transition-transform"
                                style={{ top: "25%", left: "68%" }}
                              />

                              {/* Project 2 Dot */}
                              <button
                                onClick={() => { setSelectedProject(2); setRadarRotating(false); }}
                                className="absolute w-3 h-3 rounded-full bg-amber-400 border border-white shadow-[0_0_10px_#f59e0b] cursor-pointer hover:scale-125 z-10 transition-transform"
                                style={{ top: "68%", left: "32%" }}
                              />

                              {/* Project 3 Dot */}
                              <button
                                onClick={() => { setSelectedProject(3); setRadarRotating(false); }}
                                className="absolute w-3 h-3 rounded-full bg-rose-400 border border-white shadow-[0_0_10px_#f43f5e] cursor-pointer hover:scale-125 z-10 transition-transform"
                                style={{ top: "45%", left: "20%" }}
                              />

                              {/* Project 4 Dot */}
                              <button
                                onClick={() => { setSelectedProject(4); setRadarRotating(false); }}
                                className="absolute w-3 h-3 rounded-full bg-sky-400 border border-white shadow-[0_0_10px_#0ea5e9] cursor-pointer hover:scale-125 z-10 transition-transform"
                                style={{ top: "35%", left: "45%" }}
                              />

                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <span className="px-2.5 py-0.5 bg-black/75 rounded-full border border-white/10 text-[8px] font-bold uppercase tracking-widest text-stone-400">RW26 RADAR</span>
                              </div>
                            </div>

                            <div className="flex gap-3 mt-3 text-[9px] font-bold text-stone-500 uppercase tracking-wider">
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Web</span>
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> IoT</span>
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> Energi</span>
                              <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> AI</span>
                            </div>
                          </div>

                          {/* Right: Project Lists / Details */}
                          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                            <div className="space-y-1">
                              <div className="flex justify-between items-center">
                                <h4 className="font-serif italic text-lg text-current">Peta Inovasi Digital</h4>
                                <button 
                                  onClick={() => setRadarRotating(true)}
                                  className="text-[9px] font-bold tracking-wider uppercase px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-stone-400 hover:text-current flex items-center gap-1 cursor-pointer transition-all"
                                >
                                  <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} /> Putar Radar
                                </button>
                              </div>
                              <p className="text-[11px] text-stone-500">Pilih titik satelit radar di kiri atau daftar proyek di bawah ini.</p>
                            </div>

                            <div className="flex flex-col gap-1.5 max-h-[140px] overflow-y-auto pr-1">
                              {projects.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => { setSelectedProject(p.id); setRadarRotating(false); }}
                                  className={`text-left p-2.5 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${
                                    selectedProject === p.id
                                      ? "bg-sky-500/10 border-sky-500/40 text-current"
                                      : "bg-black/5 dark:bg-white/5 border-transparent text-stone-400 hover:bg-black/10 dark:hover:bg-white/10"
                                  }`}
                                >
                                  <div>
                                    <h5 className="text-[11px] font-bold text-current">{p.title}</h5>
                                    <span className="text-[9px] text-stone-500">{p.tech}</span>
                                  </div>
                                  <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                    p.status === "Production Ready" ? "bg-emerald-500/10 text-emerald-500" :
                                    p.status === "Beta Testing" ? "bg-sky-500/10 text-sky-500" :
                                    p.status === "Prototyping" ? "bg-amber-500/10 text-amber-500" :
                                    "bg-rose-500/10 text-rose-500"
                                  }`}>
                                    {p.status}
                                  </span>
                                </button>
                              ))}
                            </div>

                            {/* Detailed Info Section */}
                            <AnimatePresence mode="wait">
                              {selectedProject !== null && (
                                <motion.div
                                  key={selectedProject}
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: 5 }}
                                  className="p-3.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2.5 text-xs"
                                >
                                  {(() => {
                                    const p = projects.find(item => item.id === selectedProject);
                                    if (!p) return null;
                                    return (
                                      <>
                                        <div className="flex justify-between items-start">
                                          <div>
                                            <h6 className="font-bold text-sky-400">{p.title}</h6>
                                            <span className="text-[9px] text-stone-500 font-mono">Tech: {p.tech}</span>
                                          </div>
                                          <button 
                                            onClick={() => setSelectedProject(null)}
                                            className="text-[9px] text-stone-500 hover:text-stone-300 font-bold uppercase tracking-wider"
                                          >
                                            tutup
                                          </button>
                                        </div>
                                        <p className="text-[11px] text-stone-500 leading-relaxed">
                                          {p.desc}
                                        </p>
                                        <div className="grid grid-cols-3 gap-2 text-center text-[9px] border-t border-black/5 dark:border-white/5 pt-2">
                                          <div>
                                            <span className="text-stone-400 block font-bold uppercase">Progres</span>
                                            <span className="text-emerald-500 font-bold font-mono">{p.progress}%</span>
                                          </div>
                                          <div>
                                            <span className="text-stone-400 block font-bold uppercase">Dampak</span>
                                            <span className="text-sky-500 font-bold">{p.impact}</span>
                                          </div>
                                          <div>
                                            <span className="text-stone-400 block font-bold uppercase">Status</span>
                                            <span className="text-amber-500 font-bold">{p.status}</span>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom telemetry indicators */}
                <div className="mt-6 border-t pt-4 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 gap-2" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
                  <span>Simulasi Telemetri & Desain Terpadu Balai Warga RW 26</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync Connected
                  </span>
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
