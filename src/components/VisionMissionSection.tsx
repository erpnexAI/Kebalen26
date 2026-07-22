import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion } from "motion/react";
import { Sparkles, Eye, Target, Award, Shield, Cpu, Flame } from "lucide-react";

interface VisionMissionSectionProps {
  isDayMode: boolean;
}

export function VisionMissionSection({ isDayMode }: VisionMissionSectionProps) {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [coordText, setCoordText] = useState("SYS_IDLE");
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    if (isHovered) {
      const codes = [
        "SYS_ACTIVE", 
        "SCANNING_GRID", 
        "RW26_LIVE_NODE", 
        "OP_ACCELERATED", 
        "DATA_STABLE", 
        "SECURE_LINK",
        "SYNCING_COORDS",
        "ENERGY_NODE_OK"
      ];
      const interval = setInterval(() => {
        const randomCode = codes[Math.floor(Math.random() * codes.length)];
        setCoordText(randomCode);
      }, 900);
      return () => clearInterval(interval);
    } else {
      // Clear trail when leaving
      setTrail([]);
    }
  }, [isHovered]);

  const handleMouseMove = (e: MouseEvent) => {
    if (!sectionRef.current) return;
    const newPos = { x: e.clientX, y: e.clientY };
    setMousePos(newPos);

    // Append new position to the trail array
    trailIdRef.current += 1;
    const newId = trailIdRef.current;
    
    setTrail((prev) => {
      const updated = [...prev, { ...newPos, id: newId }];
      // Keep the trail to a max of 12 coordinates to form a beautiful smoke trail
      if (updated.length > 12) {
        return updated.slice(1);
      }
      return updated;
    });
  };

  const containerBg = isDayMode 
    ? "bg-[#faf9f6] text-black border-t border-stone-200" 
    : "bg-black text-[#E1E0CC] border-t border-white/5";

  const cardBg = isDayMode
    ? "bg-white/40 border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
    : "bg-neutral-900/40 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]";

  const missions = [
    {
      num: "01",
      title: "Infrastruktur Pintar",
      desc: "Menyediakan layanan administrasi mandiri & Panic Button darurat yang responsif bagi seluruh warga RW 26."
    },
    {
      num: "02",
      title: "Kemandirian Energi",
      desc: "Mengimplementasikan teknologi terbarukan seperti panel surya untuk penerangan umum berkelanjutan."
    },
    {
      num: "03",
      title: "Guyub Rukun 2.0",
      desc: "Membangun jembatan komunikasi inklusif yang menyatukan kearifan lokal dengan inovasi modern."
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full min-h-screen py-24 sm:py-32 flex items-center overflow-hidden transition-colors duration-500 cursor-none ${containerBg}`}
    >
      {/* Custom Futuristic Interactive Cursor Overlay */}
      {isHovered && (
        <>
          {/* Glowing Green Smoke Trail/Shadow Particles */}
          {trail.map((pt, idx) => {
            // idx ranges from 0 (oldest) to trail.length - 1 (newest)
            const ageRatio = idx / Math.max(1, trail.length - 1); // 0 (oldest) to 1 (newest)
            const opacity = ageRatio * 0.4; // older are fainter
            const scale = 0.4 + (1 - ageRatio) * 1.8; // older are larger (dispersion)
            const blur = 3 + (1 - ageRatio) * 12; // older are blurrier (smoke dissipation)
            
            return (
              <div
                key={pt.id}
                className="fixed pointer-events-none z-40 rounded-full bg-emerald-500/15 mix-blend-screen hidden md:block"
                style={{
                  left: pt.x,
                  top: pt.y,
                  width: "20px",
                  height: "20px",
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  filter: `blur(${blur}px)`,
                  opacity: opacity,
                  boxShadow: "0 0 16px rgba(16,185,129,0.25)"
                }}
              />
            );
          })}

          <div 
            className="fixed pointer-events-none z-50 hidden md:block"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              transform: "translate(-50%, -50%)"
            }}
          >
            {/* Green Smoke Shadow Glow Aura on the active cursor */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-emerald-500/15 filter blur-[24px] pointer-events-none mix-blend-screen animate-pulse" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-emerald-400/20 filter blur-[10px] pointer-events-none mix-blend-screen" />

            {/* Rotating Outer Tech Circular Radar */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className={`absolute -inset-4 rounded-full border border-dashed ${
                isDayMode ? "border-emerald-500/40" : "border-emerald-400/50"
              }`}
            />

            {/* Inner radar Ring */}
            <div className={`absolute -inset-2 rounded-full border ${
              isDayMode ? "border-emerald-500/20" : "border-emerald-400/20"
            }`} />

            {/* Coordinate Crosshairs */}
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-[1px] ${
              isDayMode ? "bg-emerald-500/30" : "bg-emerald-400/40"
            }`} />
            <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-6 ${
              isDayMode ? "bg-emerald-500/30" : "bg-emerald-400/40"
            }`} />

            {/* Hyperactive Inner Core Core */}
            <motion.div 
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" 
            />

            {/* Floating Telemetry & System Readout Info */}
            <div className={`absolute left-5 top-2 flex flex-col gap-0.5 bg-black/90 backdrop-blur-md border rounded px-2 py-1 text-[8px] font-mono tracking-wider text-emerald-400 whitespace-nowrap shadow-xl ${
              isDayMode ? "border-emerald-500/20" : "border-white/10"
            }`}>
              <div className="flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-bold">{coordText}</span>
              </div>
              <span className="opacity-60 text-[7px]">X:{mousePos.x} | Y:{mousePos.y}</span>
            </div>

            {/* Ripple Wave */}
            <motion.div
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
              className="absolute -inset-2 rounded-full bg-emerald-400/20"
            />
          </div>
        </>
      )}

      {/* Decorative Radial Glowing Elements - Premium luxury look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full filter blur-[100px] sm:blur-[150px] transition-all duration-1000 ${
          isDayMode ? "bg-emerald-500/5" : "bg-emerald-500/10"
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] rounded-full filter blur-[100px] sm:blur-[120px] transition-all duration-1000 ${
          isDayMode ? "bg-amber-500/5" : "bg-amber-500/10"
        }`} />
        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70`} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT COLUMN: VISI, MISI, TAGLINE CONTENT */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Tagline / Eyebrow (Elegant, no slop patterns) */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span>About</span>
              </div>
              
              <h2 className={`font-flared font-bold italic text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight transition-colors duration-500 ${
                isDayMode ? "text-emerald-600" : "text-[#E1E0CC]"
              }`}>
                Sinergi Tradisi, <br />
                <span className="text-emerald-400 not-italic font-sans font-bold tracking-tight">BE.R.JU.AN.G</span>
              </h2>
              
              <p className={`text-base sm:text-lg font-light leading-relaxed max-w-2xl transition-colors duration-500 ${
                isDayMode ? "text-stone-600" : "text-stone-400"
              }`}>
                Kami memadukan kehangatan silaturahmi warga Kebalen dengan teknologi modern guna melahirkan tata kelola lingkungan yang cerdas, aman, rukun, dan mandiri secara berkelanjutan.
              </p>
            </div>

            {/* Visi & Misi Tabbed/Structured Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
              {/* Visi Box */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden ${cardBg} ${
                  isDayMode 
                    ? "hover:border-emerald-500/40 hover:shadow-[0_20px_40px_rgba(16,185,129,0.06)] hover:bg-white/80" 
                    : "hover:border-emerald-500/30 hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:bg-emerald-950/5"
                }`}
              >
                {/* Accent Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Background Typography Watermark */}
                <div className="absolute -bottom-4 -right-2 text-7xl font-serif italic font-bold select-none pointer-events-none transition-all duration-500 opacity-[0.02] group-hover:opacity-[0.06] group-hover:translate-y-[-4px]">
                  Visi
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out shadow-sm">
                    <Eye className="w-5 h-5 transition-transform duration-500 group-hover:rotate-[15deg]" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-semibold text-emerald-500">PRESTASI MASA DEPAN</span>
                    <h3 className="font-serif italic text-xl font-bold text-current">Visi Kami</h3>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                  isDayMode ? "text-stone-600 group-hover:text-stone-900" : "text-stone-400 group-hover:text-stone-200"
                }`}>
                  Menjadi pelopor lingkungan cerdas (Smart Kampung) yang mandiri, transparan, dan harmonis melalui perpaduan kearifan lokal dan inovasi digital terkini di Kebalen RW 26.
                </p>

                {/* Micro Action link arrow */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-500 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Lihat Program Unggulan</span>
                  <span className="text-sm">→</span>
                </div>
              </motion.div>

              {/* Misi Box */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`group relative p-8 rounded-2xl border backdrop-blur-md transition-all duration-500 cursor-pointer overflow-hidden ${cardBg} ${
                  isDayMode 
                    ? "hover:border-amber-500/40 hover:shadow-[0_20px_40px_rgba(245,158,11,0.06)] hover:bg-white/80" 
                    : "hover:border-amber-500/30 hover:shadow-[0_20px_50px_rgba(245,158,11,0.15)] hover:bg-amber-950/5"
                }`}
              >
                {/* Accent Highlight Line */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-amber-500/0 via-amber-500 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Background Typography Watermark */}
                <div className="absolute -bottom-4 -right-2 text-7xl font-serif italic font-bold select-none pointer-events-none transition-all duration-500 opacity-[0.02] group-hover:opacity-[0.06] group-hover:translate-y-[-4px]">
                  Misi
                </div>

                <div className="flex items-center gap-4 mb-5">
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-white group-hover:scale-110 transition-all duration-500 ease-out shadow-sm">
                    <Target className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-widest font-semibold text-amber-500">LANGKAH NYATA</span>
                    <h3 className="font-serif italic text-xl font-bold text-current">Misi Kami</h3>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                  isDayMode ? "text-stone-600 group-hover:text-stone-900" : "text-stone-400 group-hover:text-stone-200"
                }`}>
                  Mewujudkan transparansi tata kelola iuran warga, menerapkan energi terbarukan, serta menyediakan platform respons cepat darurat demi ketenteraman dan kerukunan bersama.
                </p>

                {/* Micro Action link arrow */}
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-500 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span>Lihat Fokus Strategis</span>
                  <span className="text-sm">→</span>
                </div>
              </motion.div>
            </div>

            {/* Three Mission Points - Anti-Slop elegant tech/magic interactive layout */}
            <div className="space-y-4 pt-6 border-t transition-colors duration-500" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  FOKUS AKSI STRATEGIS [TERMINAL_v2.6]
                </span>
                <span className="text-[9px] font-mono opacity-50 uppercase tracking-widest">SYSTEM STATUS: READY</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {missions.map((m, index) => {
                  const nodeCodes = ["NODE_01 // ACCESS_GRANTED", "NODE_02 // SYSTEM_ONLINE", "NODE_03 // FEED_STABLE"];
                  const icons = [
                    <Cpu className="w-3.5 h-3.5 text-emerald-400" />,
                    <Flame className="w-3.5 h-3.5 text-amber-400" />,
                    <Shield className="w-3.5 h-3.5 text-blue-400" />
                  ];
                  const isActive = activeCard === index;
                  
                  return (
                    <motion.div 
                      key={m.num} 
                      onClick={() => setActiveCard(activeCard === index ? null : index)}
                      whileHover={{ y: -4 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className={`group relative p-5 rounded-xl border transition-all duration-500 overflow-hidden cursor-pointer ${
                        isActive
                          ? index === 0
                            ? "bg-emerald-500/10 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]"
                            : index === 1
                            ? "bg-amber-500/10 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
                            : "bg-blue-500/10 border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                          : isDayMode 
                          ? "bg-white/50 border-stone-200/60 hover:bg-white hover:border-emerald-500/30 hover:shadow-[0_12px_24px_rgba(16,185,129,0.04)]" 
                          : "bg-neutral-900/40 border-white/5 hover:bg-neutral-900/80 hover:border-emerald-400/30 hover:shadow-[0_12px_32px_rgba(16,185,129,0.08)]"
                      }`}
                    >
                      {/* High-Tech Grid & Glow Lines in Background */}
                      <div 
                        className={`absolute inset-0 bg-[linear-gradient(rgba(${
                          index === 0 ? "16,185,129" : index === 1 ? "245,158,11" : "59,130,246"
                        },0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(${
                          index === 0 ? "16,185,129" : index === 1 ? "245,158,11" : "59,130,246"
                        },0.04)_1px,transparent_1px)] bg-[size:10px_10px] transition-all duration-500 pointer-events-none ${
                          isActive 
                            ? "opacity-100 scale-100" 
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />

                      {/* Pulsating Neon Light Glow Area */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0.2 }}
                          animate={{ opacity: [0.2, 0.45, 0.2] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className={`absolute inset-0 bg-gradient-to-br pointer-events-none mix-blend-screen ${
                            index === 0 
                              ? "from-emerald-500/15 via-transparent to-transparent" 
                              : index === 1 
                              ? "from-amber-500/15 via-transparent to-transparent" 
                              : "from-blue-500/15 via-transparent to-transparent"
                          }`}
                        />
                      )}

                      {/* Neon Active Cyber Corners */}
                      {isActive && (
                        <>
                          <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 pointer-events-none ${
                            index === 0 ? "border-emerald-400" : index === 1 ? "border-amber-400" : "border-blue-400"
                          }`} />
                          <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 pointer-events-none ${
                            index === 0 ? "border-emerald-400" : index === 1 ? "border-amber-400" : "border-blue-400"
                          }`} />
                          <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 pointer-events-none ${
                            index === 0 ? "border-emerald-400" : index === 1 ? "border-amber-400" : "border-blue-400"
                          }`} />
                          <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 pointer-events-none ${
                            index === 0 ? "border-emerald-400" : index === 1 ? "border-amber-400" : "border-blue-400"
                          }`} />
                        </>
                      )}
                      
                      {/* Magical Border Pulse Line */}
                      <div className={`absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-${
                        index === 0 ? "emerald-400" : index === 1 ? "amber-400" : "blue-400"
                      }/50 to-transparent transition-transform duration-700 origin-center pointer-events-none ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />
                      <div className={`absolute bottom-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-${
                        index === 0 ? "emerald-400" : index === 1 ? "amber-400" : "blue-400"
                      }/50 to-transparent transition-transform duration-700 origin-center pointer-events-none ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`} />

                      {/* Header containing status code and icon */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono font-bold transition-colors duration-300 ${
                            isActive
                              ? index === 0 ? "text-emerald-400" : index === 1 ? "text-amber-400" : "text-blue-400"
                              : "text-emerald-400 group-hover:animate-pulse"
                          }`}>
                            [{m.num}]
                          </span>
                          <span className={`text-[8px] font-mono transition-colors duration-300 ${
                            isActive
                              ? index === 0 ? "text-emerald-400/95" : index === 1 ? "text-amber-400/95" : "text-blue-400/95"
                              : "text-stone-500 group-hover:text-emerald-500/80"
                          }`}>
                            {isActive ? `NODE_${m.num} // NEON_ENGAGED` : nodeCodes[index]}
                          </span>
                        </div>
                        <div className={`p-1.5 rounded transition-all duration-500 ${
                          isActive 
                            ? index === 0 
                              ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 scale-110 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                              : index === 1
                              ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 scale-110 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                              : "bg-blue-500/20 border border-blue-500/40 text-blue-300 scale-110 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                            : "p-1 rounded bg-stone-500/5 border border-transparent group-hover:border-emerald-500/10"
                        }`}>
                          {icons[index]}
                        </div>
                      </div>

                      {/* Main Title */}
                      <h4 className={`text-sm font-bold transition-colors duration-300 flex items-center gap-1.5 ${
                        isActive
                          ? index === 0 ? "text-emerald-400" : index === 1 ? "text-amber-400" : "text-blue-400"
                          : "text-current group-hover:text-emerald-400"
                      }`}>
                        {m.title}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive
                            ? index === 0 ? "bg-emerald-400 animate-ping" : index === 1 ? "bg-amber-400 animate-ping" : "bg-blue-400 animate-ping"
                            : "bg-emerald-500 opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-50"
                        }`} />
                      </h4>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed mt-1.5 transition-colors duration-500 ${
                        isActive
                          ? isDayMode ? "text-stone-800" : "text-stone-100"
                          : isDayMode 
                          ? "text-stone-500 group-hover:text-stone-700" 
                          : "text-stone-400/80 group-hover:text-stone-200"
                      }`}>
                        {m.desc}
                      </p>

                      {/* Futuristic scanning light streak */}
                      <div className="absolute -left-1/2 top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-400/10 to-transparent skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Metrics Grid at the bottom (similar to mockup image with 12+ awards won etc.) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t transition-colors duration-500" style={{ borderColor: isDayMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)' }}>
              {/* Stat 1: 100% */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative p-3 sm:p-4 rounded-xl border overflow-hidden transition-all duration-300 ${
                  isDayMode
                    ? "bg-emerald-500/[0.03] border-emerald-500/10 hover:border-emerald-500/30 hover:bg-emerald-500/[0.06] shadow-[0_4px_20px_rgba(16,185,129,0.02)]"
                    : "bg-emerald-500/[0.02] border-emerald-500/5 hover:border-emerald-400/30 hover:bg-emerald-500/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                {/* Tech Bracket */}
                <div className="absolute top-1 right-1.5 text-[7px] sm:text-[8px] font-mono text-emerald-400/50 select-none">[SYS_OK]</div>
                
                {/* Neon Background Aura */}
                <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
                
                <div className="space-y-1 relative z-10">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-tight text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse">
                    100%
                  </div>
                  <div className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-bold font-sans transition-colors duration-300 ${
                    isDayMode ? "text-stone-600" : "text-stone-400/90"
                  }`}>
                    Transparansi Keuangan
                  </div>
                </div>
              </motion.div>

              {/* Stat 2: 2.5 KWp */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative p-3 sm:p-4 rounded-xl border overflow-hidden transition-all duration-300 ${
                  isDayMode
                    ? "bg-amber-500/[0.03] border-amber-500/10 hover:border-amber-500/30 hover:bg-amber-500/[0.06] shadow-[0_4px_20px_rgba(245,158,11,0.02)]"
                    : "bg-amber-500/[0.02] border-amber-500/5 hover:border-amber-400/30 hover:bg-amber-500/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                {/* Tech Bracket */}
                <div className="absolute top-1 right-1.5 text-[7px] sm:text-[8px] font-mono text-amber-400/50 select-none">[BAT_CHG]</div>
                
                {/* Neon Background Aura */}
                <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
                
                <div className="space-y-1 relative z-10">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-tight text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    2.5 KWp
                  </div>
                  <div className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-bold font-sans transition-colors duration-300 ${
                    isDayMode ? "text-stone-600" : "text-stone-400/90"
                  }`}>
                    Panel Surya Cerdas
                  </div>
                </div>
              </motion.div>

              {/* Stat 3: 24/7 */}
              <motion.div 
                whileHover={{ y: -3, scale: 1.02 }}
                className={`relative p-3 sm:p-4 rounded-xl border overflow-hidden transition-all duration-300 ${
                  isDayMode
                    ? "bg-rose-500/[0.03] border-rose-500/10 hover:border-rose-500/30 hover:bg-rose-500/[0.06] shadow-[0_4px_20px_rgba(244,63,94,0.02)]"
                    : "bg-rose-500/[0.02] border-rose-500/5 hover:border-rose-400/30 hover:bg-rose-500/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                }`}
              >
                {/* Tech Bracket */}
                <div className="absolute top-1 right-1.5 text-[7px] sm:text-[8px] font-mono text-rose-400/50 select-none">[SOS_ON]</div>
                
                {/* Neon Background Aura */}
                <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-rose-500/10 blur-xl pointer-events-none" />
                
                <div className="space-y-1 relative z-10">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-tight text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse">
                    24/7
                  </div>
                  <div className={`text-[8px] sm:text-[10px] uppercase tracking-wider font-bold font-sans transition-colors duration-300 ${
                    isDayMode ? "text-stone-600" : "text-stone-400/90"
                  }`}>
                    Akses Panic Button
                  </div>
                </div>
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN: KOTAK GAMBAR PREMIUM (Starry tv knob aesthetic) */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`relative w-full max-w-md aspect-[4/5] rounded-[32px] overflow-hidden p-[1.5px] transition-all duration-500 group shadow-[0_30px_100px_rgba(212,175,55,0.15)] ${
                isDayMode 
                  ? "bg-stone-200/60 shadow-2xl" 
                  : "bg-white/5 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
              }`}
            >
              {/* Golden Rotating Beam Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-60%] bg-[conic-gradient(from_0deg,transparent_35%,#E6C15C_50%,transparent_65%)] opacity-100 z-0 pointer-events-none"
                style={{ originX: "50%", originY: "50%" }}
              />

              {/* Thin Golden Frame Glow Border */}
              <div className="absolute inset-0 rounded-[32px] border border-[#E6C15C]/25 z-10 pointer-events-none" />

              {/* Soft gold light aura on hover */}
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-[#E6C15C]/5 to-[#C5A03A]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0 pointer-events-none" />

              {/* Inner container */}
              <div className="relative w-full h-full rounded-[30.5px] overflow-hidden bg-black/95 z-10">
                {/* Tech blue-grid overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-10" />
                
                {/* Image */}
                <motion.div 
                  initial={{ scale: 1.1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full bg-cover bg-center opacity-70"
                  style={{ 
                    // High-quality, starry night background with warm glow
                    backgroundImage: "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800')" 
                  }}
                />

                {/* Soft gradient cover to blend with the borders */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Starry Night Overlay element mirroring the mockup */}
                <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] text-stone-300 font-bold tracking-widest uppercase">
                      <Cpu className="w-3 h-3 text-emerald-400" />
                      <span>Sistem Terpadu</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-stone-400">ONLINE</span>
                    </div>
                  </div>

                  {/* Aesthetic card info inside image (Mockup look) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                      <span className="text-[9px] text-amber-300 uppercase tracking-widest font-bold">SIMULATOR ENERGI</span>
                    </div>
                    <h4 className="font-serif italic text-base text-white">Sinar Kebalen Mandiri</h4>
                    <p className="text-[10px] text-stone-400 leading-relaxed font-light">
                      Kalkulasi penyerapan solar panel digital mengoptimalkan kelistrikan gedung serbaguna RW 26 secara realtime.
                    </p>
                    <div className="flex justify-between items-center text-[8px] text-stone-500 font-mono pt-1 border-t border-white/5">
                      <span>MONITOR SYSTEM</span>
                      <span>ACTIVE FEED</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
