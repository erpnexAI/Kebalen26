import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Globe, 
  Zap, 
  ShieldCheck, 
  Brain, 
  ArrowRight,
  Flame,
  Activity,
  Compass,
  Cpu
} from "lucide-react";

interface ProgramKegiatanSectionProps {
  isDayMode: boolean;
}

export function ProgramKegiatanSection({ isDayMode }: ProgramKegiatanSectionProps) {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const programs = [
    {
      id: 0,
      num: "PRG-01",
      code: "NODE_SYS // CONNECTED",
      title: "RW Digital & Transparansi",
      subtitle: "Smart Portal Pelayanan Warga",
      desc: "Integrasi satu pintu kependudukan, laporan keuangan kas transparan real-time, sirkulasi surat pengantar otomatis, dan dasbor interaktif informasi RT/RW untuk kemudahan akses seluruh warga.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop",
      icon: <Globe className="w-5 h-5 text-stone-900" />,
      color: "from-emerald-500/20 to-teal-500/20",
      accent: "emerald",
      neonColor: "rgba(16, 185, 129, 0.4)",
      badge: "AKTIF"
    },
    {
      id: 1,
      num: "PRG-02",
      code: "SOLAR_GRID // HARVESTING",
      title: "Solar Eco-Energy",
      subtitle: "Pembangkit Listrik Surya Cerdas",
      desc: "Instalasi panel surya berkapasitas 2.5 KWp di atap Balai Warga RW26 untuk menyuplai kebutuhan energi operasional, meminimalkan biaya kas bulanan, sekaligus mengedukasi warga tentang energi bersih.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
      icon: <Zap className="w-5 h-5 text-stone-900" />,
      color: "from-amber-500/20 to-orange-500/20",
      accent: "amber",
      neonColor: "rgba(245, 158, 11, 0.4)",
      badge: "OPTIMIZED"
    },
    {
      id: 2,
      num: "PRG-03",
      code: "SEC_NET // ACTIVE_24H",
      title: "Smart Security & SOS",
      subtitle: "Panic Button & AI Surveillance",
      desc: "Jaringan CCTV lingkungan terintegrasi dengan sensor gerak malam hari, didukung tombol darurat (Panic Button) fisik dan digital di HP warga untuk respons cepat keamanan siaga 24/7.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1200&auto=format&fit=crop",
      icon: <ShieldCheck className="w-5 h-5 text-stone-900" />,
      color: "from-rose-500/20 to-red-500/20",
      accent: "rose",
      neonColor: "rgba(244, 63, 94, 0.4)",
      badge: "SECURE"
    },
    {
      id: 3,
      num: "PRG-04",
      code: "EDULAB_W_04 // ACTIVE",
      title: "Digital Lab & Edutech",
      subtitle: "Pusat Inkubasi Kreatif Warga",
      desc: "Ruang kolaborasi teknologi hijau dan digital: pelatihan programming dasar, robotika ramah anak, pertanian hidroponik otomatis IoT, serta lokakarya pengembangan ide kreatif pemuda RW26.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      icon: <Brain className="w-5 h-5 text-stone-900" />,
      color: "from-blue-500/20 to-indigo-500/20",
      accent: "blue",
      neonColor: "rgba(59, 130, 246, 0.4)",
      badge: "LEARNING"
    }
  ];

  return (
    <section 
      id="programs" 
      className={`relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-16 overflow-hidden transition-colors duration-500 ${
        isDayMode ? "bg-[#fcfbf9]" : "bg-[#050505]"
      }`}
    >
      {/* Background Cyber Tech Grid */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0 ${
        isDayMode ? "opacity-15" : "opacity-30"
      }`} />

      {/* Futuristic glowing ambient background lights */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-md border ${
              isDayMode 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700" 
                : "bg-emerald-500/5 border-emerald-500/15 text-emerald-400"
            }`}>
              [SYS_NODE // PROGRAM_KEGIATAN_RW26]
            </span>
            <span className={`w-2 h-2 rounded-full animate-ping ${
              isDayMode ? "bg-emerald-600" : "bg-emerald-400"
            }`} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 space-y-4">
              <motion.h2 
                initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`text-4xl sm:text-5xl md:text-6xl font-flared font-bold italic leading-none tracking-tight ${
                  isDayMode ? "text-emerald-600" : "text-[#E1E0CC]"
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                  className="inline-block"
                >
                  Program Unggulan
                </motion.span>{" "}
                <br />
                <motion.span
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                  className="text-emerald-400 not-italic font-sans font-bold tracking-tight inline-block"
                >
                  Kemandirian & Inovasi
                </motion.span>
              </motion.h2>
              <motion.div 
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
                className={`h-[1px] w-32 bg-gradient-to-r ${
                  isDayMode ? "from-emerald-500/50 to-transparent" : "from-emerald-400/50 to-transparent"
                }`} 
              />
            </div>

            <div className="lg:col-span-4 lg:pl-4">
              <p className={`text-sm sm:text-base leading-relaxed font-light ${
                isDayMode ? "text-stone-600" : "text-stone-400/95"
              }`}>
                Empat pilar pengembangan ekosistem rukun warga berbasis riset sosial, efisiensi energi, sistem pengamanan aktif, dan pemberdayaan generasi digital.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Interactive Accordion Grid (Image Reference Style) */}
        <div className="hidden md:flex gap-4 h-[550px] w-full mt-8 select-none">
          {programs.map((prog, index) => {
            // Neon accent border colors
            const borderAccentClass = 
              prog.accent === "emerald" 
                ? "border-emerald-500/20 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.15)]" 
                : prog.accent === "amber" 
                ? "border-amber-500/20 hover:border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.15)]"
                : prog.accent === "rose" 
                ? "border-rose-500/20 hover:border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.15)]"
                : "border-blue-500/20 hover:border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.15)]";

            const accentGlowText = 
              prog.accent === "emerald" 
                ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                : prog.accent === "amber" 
                ? "text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"
                : prog.accent === "rose" 
                ? "text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"
                : "text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]";

            return (
              <div
                key={prog.id}
                className={`group relative h-full rounded-[32px] overflow-hidden cursor-pointer border transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-1 hover:flex-[4.2] ${
                  isDayMode 
                    ? "bg-white/40 border-stone-200/60 shadow-[0_4px_24px_rgba(0,0,0,0.02)]" 
                    : "bg-stone-900/40 border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                } ${borderAccentClass}`}
              >
                {/* Background Image Container with Absolute Clarity - No dark overlays or gradients */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] scale-100 group-hover:scale-105"
                  />
                </div>

                {/* Vertical Text when card is collapsed (Fills narrow panels beautifully) */}
                <div className="absolute inset-0 flex flex-col justify-between items-center py-10 px-4 z-20 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-100 scale-100 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none">
                  {/* Code Header top */}
                  <span className="text-[10px] font-mono font-bold text-stone-300 tracking-widest writing-mode-vertical rotate-180 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {prog.num}
                  </span>
                  
                  {/* Collapsed Vertical Title */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="writing-mode-vertical rotate-180 text-xs sm:text-sm font-sans font-bold uppercase tracking-widest text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-colors duration-300">
                      {prog.title.split(" & ")[0]}
                    </span>
                  </div>

                  {/* Icon Indicator at bottom */}
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110 text-stone-900 border border-stone-200/20">
                    {prog.icon}
                  </div>
                </div>

                {/* Expanded Card Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-8 sm:p-10 z-20 h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 scale-95 pointer-events-none translate-y-4 group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto group-hover:translate-y-0">
                  {/* Header row with backdrop blur plate */}
                  <div className="flex items-center justify-between bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 max-w-sm">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-white/15 bg-white/5 text-stone-300">
                        {prog.code}
                      </span>
                      <span className="text-xs font-mono text-stone-400">
                        [REF_{prog.num}]
                      </span>
                    </div>
                    <span className="text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Middle Tech Visual Grid Overlay */}
                  <div className="w-full flex-grow flex items-center justify-center opacity-10 pointer-events-none">
                    <div className="w-32 h-32 border border-white/20 rounded-full animate-spin-slow flex items-center justify-center">
                      <div className="w-20 h-20 border border-dashed border-white/20 rounded-full" />
                    </div>
                  </div>

                  {/* Main Title & Description footer (Sophisticated semi-transparent black glass plate for perfect text contrast & readability) */}
                  <div className="space-y-4 max-w-2xl bg-black/90 backdrop-blur-lg p-6 sm:p-7 rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    <div className="space-y-1">
                      <span className="text-xs uppercase tracking-widest text-[#E6C15C] font-mono font-bold block">
                        {prog.subtitle}
                      </span>
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-sans font-bold uppercase tracking-tight ${accentGlowText}`}>
                        {prog.title}
                      </h3>
                    </div>

                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light font-sans max-w-xl">
                      {prog.desc}
                    </p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Circle button at bottom like in mockup image */}
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-2xl text-stone-900">
                          {prog.icon}
                        </div>
                        <span className="text-[10px] font-mono text-stone-400 tracking-wider">
                          DIKEMBANGKAN OLEH RW26 LAB
                        </span>
                      </div>

                      {/* Tech bracket status */}
                      <div className="text-[9px] font-mono text-white/40">
                        COORD_X: 0{(index + 1) * 3} // COORD_Y: 0721
                      </div>
                    </div>
                  </div>
                </div>

                {/* Continuous glowing edge beam only on hover */}
                <div className={`absolute inset-0 rounded-[32px] border-[1.5px] pointer-events-none z-30 transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                  prog.accent === "emerald" 
                    ? "border-emerald-500/25" 
                    : prog.accent === "amber" 
                    ? "border-amber-500/25" 
                    : prog.accent === "rose"
                    ? "border-rose-500/25"
                    : "border-blue-500/25"
                }`} />
              </div>
            );
          })}
        </div>

        {/* Mobile / Responsive Layout (Stacked vertical cards with smooth accordion height expansion) */}
        <div className="md:hidden flex flex-col gap-4 w-full mt-6">
          {programs.map((prog, index) => {
            const isActive = activeCard === index;
            
            const borderAccentClass = 
              prog.accent === "emerald" 
                ? "border-emerald-400/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                : prog.accent === "amber" 
                ? "border-amber-400/40 bg-amber-950/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]"
                : prog.accent === "rose" 
                ? "border-rose-400/40 bg-rose-950/20 shadow-[0_0_20px_rgba(244,63,94,0.1)]"
                : "border-blue-400/40 bg-blue-950/20 shadow-[0_0_20px_rgba(59,130,246,0.1)]";

            const accentGlowText = 
              prog.accent === "emerald" 
                ? "text-emerald-400" 
                : prog.accent === "amber" 
                ? "text-amber-400"
                : prog.accent === "rose" 
                ? "text-rose-400"
                : "text-blue-400";

            return (
              <motion.div
                key={prog.id}
                onClick={() => setActiveCard(isActive ? -1 : index)}
                animate={{ 
                  height: isActive ? "340px" : "72px"
                }}
                transition={{ type: "spring", stiffness: 130, damping: 18 }}
                className={`relative w-full rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  isActive 
                    ? borderAccentClass 
                    : isDayMode 
                    ? "bg-white border-stone-200" 
                    : "bg-stone-900/60 border-white/5"
                }`}
              >
                {/* Background image on active */}
                <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                  <img 
                    src={prog.image} 
                    alt={prog.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      isActive ? "opacity-35 scale-105" : "opacity-0"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/35 z-10" />
                </div>

                {/* Collapsed Header Bar */}
                <div className="absolute top-0 left-0 right-0 h-[72px] flex items-center justify-between px-4 z-20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md">
                      {prog.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-emerald-400/80 font-bold block mb-0.5">
                        {prog.num}
                      </span>
                      <h4 className={`text-sm font-sans font-bold tracking-tight transition-colors ${
                        isActive ? "text-white" : isDayMode ? "text-stone-900" : "text-stone-100"
                      }`}>
                        {prog.title}
                      </h4>
                    </div>
                  </div>
                  
                  {/* Status arrow */}
                  <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`p-1.5 rounded-lg border ${
                      isActive 
                        ? "border-white/10 text-white bg-white/5" 
                        : isDayMode 
                        ? "border-stone-200 text-stone-500" 
                        : "border-white/5 text-stone-400 bg-white/[0.02]"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Expanded Details Body */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-0 left-0 right-0 p-5 pt-[80px] z-20 flex flex-col justify-end h-full gap-3"
                    >
                      <div className="space-y-1">
                        <span className="text-[9px] uppercase tracking-widest text-amber-300 font-mono font-bold">
                          {prog.subtitle}
                        </span>
                        <h4 className={`text-lg font-sans font-bold uppercase tracking-tight ${accentGlowText}`}>
                          {prog.title}
                        </h4>
                      </div>

                      <p className="text-stone-300 text-xs leading-relaxed font-light font-sans line-clamp-4">
                        {prog.desc}
                      </p>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[8px] font-mono text-stone-400">
                        <span>{prog.code}</span>
                        <span>DIKEMBANGKAN OLEH RW26 LAB</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
