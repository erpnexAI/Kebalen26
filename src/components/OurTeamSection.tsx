import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Cpu, 
  Shield, 
  Flame, 
  Activity, 
  Briefcase,
  Bot
} from "lucide-react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  hue: number;
  sat: number;
  light: number;
  decay: number;
  spin: number;
  angle: number;
}

interface OurTeamSectionProps {
  isDayMode: boolean;
}

export function OurTeamSection({ isDayMode }: OurTeamSectionProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const hueCounterRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Silky 60fps Canvas Smoke Particle Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985; // drag
        p.vy *= 0.985;
        p.size += 0.85; // billow / expand smoke
        p.alpha -= p.decay; // fade
        p.angle += p.spin;

        if (p.alpha <= 0 || p.size >= p.maxSize) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.globalCompositeOperation = isDayMode ? "multiply" : "screen";

        // Multi-color radial smoke gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        const colorInner = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0.85)`;
        const colorMid = `hsla(${(p.hue + 45) % 360}, ${p.sat}%, ${p.light - 10}%, 0.45)`;
        const colorOuter = `hsla(${p.hue}, ${p.sat}%, ${p.light}%, 0)`;

        grad.addColorStop(0, colorInner);
        grad.addColorStop(0.4, colorMid);
        grad.addColorStop(1, colorOuter);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [isDayMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const x = e.clientX;
    const y = e.clientY;
    setMousePos({ x, y });

    const dx = x - lastPosRef.current.x;
    const dy = y - lastPosRef.current.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 3) {
      lastPosRef.current = { x, y };

      // Continuously cycle rainbow hues as mouse moves
      hueCounterRef.current = (hueCounterRef.current + 10) % 360;

      const count = Math.min(5, Math.max(2, Math.floor(dist / 5)));
      for (let i = 0; i < count; i++) {
        // Diverse rainbow palette hues (Cyan, Magenta, Gold, Violet, Emerald, Orange)
        const hues = [
          hueCounterRef.current,
          (hueCounterRef.current + 70) % 360,
          (hueCounterRef.current + 140) % 360,
          (hueCounterRef.current + 210) % 360,
          (hueCounterRef.current + 280) % 360,
        ];
        const selectedHue = hues[Math.floor(Math.random() * hues.length)];

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.2 + 0.5;

        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: Math.cos(angle) * speed + dx * 0.08,
          vy: Math.sin(angle) * speed + dy * 0.08 - 0.35, // slight upward smoke rise
          size: Math.random() * 8 + 6,
          maxSize: Math.random() * 30 + 40,
          alpha: Math.random() * 0.4 + 0.35,
          hue: selectedHue,
          sat: 95,
          light: isDayMode ? 45 : 65,
          decay: Math.random() * 0.012 + 0.007,
          spin: (Math.random() - 0.5) * 0.05,
          angle: Math.random() * Math.PI * 2,
        });
      }
    }
  };

  const teamMembers = [
    {
      id: "01",
      role: "KETUA RW",
      roleIcon: <Shield className="w-3.5 h-3.5 text-emerald-400" />,
      name: "Tri Handoko Putro Stsp. Msc",
      meta: "STRATEGIC LEADERSHIP",
      desc: "Insinyur senior teknologi lingkungan dengan visi mengintegrasikan keberlanjutan energi surya dan pelayanan publik digital transparan.",
      quote: "Membangun harmoni masa depan melalui teknologi hijau dan kearifan sosial warga.",
      skills: ["Solar Grid", "Strategic Planning", "Public Service"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "02",
      role: "SEKRETARIS",
      roleIcon: <Cpu className="w-3.5 h-3.5 text-amber-400" />,
      name: "Sumaryadi S.IT",
      meta: "SYSTEM ORCHESTRATION",
      desc: "Ahli tata kelola administrasi publik digital yang mengorkestrasikan sistem portal database RW26 terpadu dan persuratan otomatis.",
      quote: "Satu klik untuk kemudahan warga adalah standard minimum pelayanan modern kami.",
      skills: ["Database Integrasi", "Cyber-Admin", "E-Governance"],
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "03",
      role: "BENDAHARA",
      roleIcon: <Activity className="w-3.5 h-3.5 text-blue-400" />,
      name: "Lintar Varia Gutomo S.E.",
      meta: "FINANCIAL TRANSPARENCY",
      desc: "Akuntan profesional penjamin akurasi 100% laporan kas digital terbuka yang dapat diakses real-time oleh seluruh warga di website.",
      quote: "Kepercayaan warga didirikan di atas pondasi keterbukaan finansial yang absolut.",
      skills: ["Ledger Digital", "Auditing", "Budget Allocation"],
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "04",
      role: "SISTEM KEAMANAN",
      roleIcon: <Flame className="w-3.5 h-3.5 text-rose-400" />,
      name: "Jatmiko",
      meta: "ACTIVE SURVEILLANCE",
      desc: "Mengembangkan protokol gerak malam taktis, Panic Button warga, serta integrasi AI surveillance CCTV di seluruh klaster lingkungan.",
      quote: "Menghadirkan rasa aman yang tak terlihat namun selalu siaga melindungi setiap sudut rumah.",
      skills: ["AI Camera", "Panic Trigger", "Tactical Safety"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "05",
      role: "TEKNOLOGI & INOVASI",
      roleIcon: <Briefcase className="w-3.5 h-3.5 text-teal-400" />,
      name: "Arifraj,ST. Mci.",
      meta: "DIGITAL INCUBATION",
      desc: "Lulusan teknik komputer penanggung jawab lab IoT, hidroponik otomatis, dan pelatihan pemrograman intensif bagi generasi muda RW26.",
      quote: "Menanam benih kecakapan digital di tanah subur kreativitas pemuda rukun warga.",
      skills: ["IoT Architecture", "Next.js/React", "Smart Farm"],
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "06",
      role: "NOTULEN & ASISTEN WARGA",
      roleIcon: <Bot className="w-3.5 h-3.5 text-emerald-400" />,
      name: "Naswa",
      meta: "NOTULEN & VOICE ASSISTANT",
      desc: "Notulen dan Asisten Warga berusia 25 tahun yang selalu menjawab pertanyaan warga dengan ceria, ramah, sopan, dan seolah tersenyum.",
      quote: "Melayani seluruh warga RW26 dengan senyum ceria, ramah, dan tanggap sesuai pertanyaan.",
      skills: ["Notula Digital", "Voice AI", "Layanan Warga"],
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section 
      id="team" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full py-24 sm:py-32 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden transition-colors duration-500 md:cursor-none ${
        isDayMode ? "bg-[#faf9f6]" : "bg-black"
      }`}
    >
      {/* Canvas for Colorful Smoke Particles */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none z-30 hidden md:block" 
      />

      {/* Futuristic Multi-Color Custom Cursor Overlay */}
      {isHovered && (
        <div 
          className="fixed pointer-events-none z-50 hidden md:block"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)"
          }}
        >
          {/* Multi-Color Glowing Prism Aura */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full bg-gradient-to-tr from-cyan-500/25 via-fuchsia-500/25 to-amber-400/25 filter blur-[30px] pointer-events-none mix-blend-screen animate-pulse" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-pink-500/35 to-cyan-400/35 filter blur-[12px] pointer-events-none mix-blend-screen" />

          {/* Rotating Outer Rainbow Gradient Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-5 rounded-full p-[1.5px] bg-[conic-gradient(from_0deg,#06b6d4,#ec4899,#a855f7,#f59e0b,#10b981,#06b6d4)] opacity-90 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
          >
            <div className={`w-full h-full rounded-full ${isDayMode ? "bg-[#faf9f6]" : "bg-black"}`} />
          </motion.div>

          {/* Cyberpunk Target Brackets */}
          <motion.div 
            animate={{ 
              scale: isHoveringCard ? 1.4 : 1,
              rotate: isHoveringCard ? 45 : 0 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute -inset-3.5 flex items-center justify-between pointer-events-none"
          >
            <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400" />
            <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-fuchsia-400" />
          </motion.div>
          <motion.div 
            animate={{ 
              scale: isHoveringCard ? 1.4 : 1,
              rotate: isHoveringCard ? 45 : 0 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="absolute -inset-3.5 flex items-end justify-between pointer-events-none"
          >
            <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-amber-400" />
            <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-emerald-400" />
          </motion.div>

          {/* Inner Core Pulsing Diamond / Node Dot */}
          <motion.div 
            animate={{ scale: [1, 1.35, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="relative w-3.5 h-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 shadow-[0_0_12px_#ec4899]"
          />

          {/* Futuristic Cyber Coordinate HUD Tag */}
          <div className="absolute top-5 left-5 whitespace-nowrap bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-300 tracking-widest flex items-center gap-1.5 shadow-lg">
            <span className="w-1 h-1 rounded-full bg-pink-400 animate-ping" />
            <span>COUNCIL_HUD // X:{Math.round(mousePos.x)} Y:{Math.round(mousePos.y)}</span>
          </div>
        </div>
      )}

      {/* Background Grid & Luxury Vibes */}
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none z-0 ${
        isDayMode ? "opacity-10" : "opacity-25"
      }`} />

      {/* Floating Light Blobs */}
      <div className="absolute right-0 top-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full filter blur-[120px] pointer-events-none z-0" />
      <div className="absolute left-10 bottom-1/4 w-[350px] h-[350px] bg-amber-500/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded ${
                isDayMode ? "bg-stone-200 text-stone-800" : "bg-white/5 border border-white/10 text-stone-300"
              }`}>
                [COUNCIL_v2.6]
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-flared font-bold italic leading-[1.1] tracking-tight ${
              isDayMode ? "text-emerald-600" : "text-[#E1E0CC]"
            }`}>
              Our Team<span className="text-emerald-400 font-sans not-italic">.</span>
            </h2>
          </div>

          <p className={`text-xs sm:text-sm max-w-md font-light leading-relaxed ${
            isDayMode ? "text-stone-600" : "text-stone-400"
          }`}>
            Jajaran kepengurusan terpadu Kebalen 26 yang mengorkestrasikan pelayanan publik, keberlanjutan energi, dan inovasi berbasis teknologi warga.
          </p>
        </div>

        {/* Native CSS-Based Expandable Accordion Cards Container */}
        <div className="flex flex-col md:flex-row w-full gap-4 md:gap-5 min-h-[500px] md:h-[540px]">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              onClick={() => setSelectedMember(member)}
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}
              className={`group relative flex-1 md:hover:flex-[2.5] lg:hover:flex-[2.8] transition-[flex,transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col justify-between rounded-[24px] p-5 sm:p-6 border overflow-hidden cursor-pointer ${
                isDayMode 
                  ? "bg-white/90 backdrop-blur border-stone-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.08)] hover:border-emerald-500/40" 
                  : "bg-stone-950/90 backdrop-blur-md border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_25px_60px_rgba(16,185,129,0.2)] hover:border-emerald-500/40"
              }`}
            >
              {/* Glowing Tech Mesh inside card */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.012)_1px,transparent_1px)] bg-[size:12px_12px] opacity-100 pointer-events-none" />

              {/* Left vertical border light ray */}
              <div className="absolute left-0 top-12 bottom-12 w-[1.5px] bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent pointer-events-none" />

              {/* Top Row: Meta Icon + Role and Card Number */}
              <div className="flex items-center justify-between relative z-10 mb-3">
                <div className="flex items-center gap-2 bg-stone-500/5 border border-white/5 px-2.5 py-1 rounded-lg shrink-0">
                  {member.roleIcon}
                  <span className="text-[9px] font-sans font-bold tracking-widest text-[#E6C15C] uppercase whitespace-nowrap">
                    {member.role}
                  </span>
                </div>
                
                {/* Serif-style thin number */}
                <span className="text-2xl sm:text-3xl font-serif italic text-stone-500/40 select-none">
                  {member.id}
                </span>
              </div>

              {/* Clear Image Render without any dark gradients or dark overlays */}
              <div className="relative w-full h-[180px] sm:h-[200px] shrink-0 rounded-2xl overflow-hidden mb-4 border border-stone-500/10">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                />
                
                {/* Hover Cybernetic HUD Scanline */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end p-3">
                  <span className="text-[9px] font-mono bg-black/70 backdrop-blur-md text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                    [CLICK TO INSPECT NODE]
                  </span>
                </div>
              </div>

              {/* Mid Section: Custom status code */}
              <div className="relative z-10 py-1 flex items-center justify-between border-b border-stone-500/10 mb-3">
                <span className="text-[7.5px] font-mono text-stone-400 tracking-wider">
                  STATUS // ACTIVE_NODE
                </span>
                <span className="text-[7px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  SECURE
                </span>
              </div>

              {/* Bottom main body details */}
              <div className="space-y-3 relative z-10 flex-grow flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-stone-500 block">
                    {member.meta}
                  </span>
                  <h3 className={`text-base sm:text-lg font-serif font-bold tracking-tight leading-snug transition-colors duration-300 ${
                    isDayMode ? "text-stone-900 group-hover:text-emerald-600" : "text-white group-hover:text-emerald-400"
                  }`}>
                    {member.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-xs leading-relaxed font-light ${
                  isDayMode ? "text-stone-600" : "text-stone-400/90"
                }`}>
                  {member.desc}
                </p>

                {/* Interactive Skill Nodes/Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {member.skills.map((skill) => (
                    <span 
                      key={skill}
                      className={`text-[8px] font-mono tracking-wider px-2 py-0.5 rounded border ${
                        isDayMode 
                          ? "bg-stone-100 border-stone-200 text-stone-600" 
                          : "bg-white/5 border-white/5 text-stone-300"
                      }`}
                    >
                      #{skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Decorative glowing bottom gradient accent */}
              <div className="absolute bottom-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Footer info bar */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-stone-500/10">
          <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">
            COUNCIL_NODES: 05 // ACTIVE
          </span>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
            KEBALEN 26 INTEGRATED SYSTEM
          </span>
        </div>

      </div>

      {/* Futuristic Holographic Inspect Modal Dialog */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden ${
              isDayMode 
                ? "bg-white/95 border-emerald-500/30 text-stone-900 shadow-[0_25px_60px_rgba(16,185,129,0.15)]" 
                : "bg-stone-950/95 border-emerald-500/40 text-[#E1E0CC] shadow-[0_25px_70px_rgba(0,0,0,0.8)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Holographic Glowing Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 animate-pulse" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-500/10 border border-stone-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
            >
              ✕
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
              {/* Modal Portrait with Glowing Border */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                <img 
                  src={selectedMember.image} 
                  alt={selectedMember.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-mono text-emerald-400 border border-emerald-500/30">
                  NODE_{selectedMember.id}
                </div>
              </div>

              {/* Details & Quote */}
              <div className="space-y-4 flex-grow text-center sm:text-left">
                <div className="space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#E6C15C] uppercase px-2 py-0.5 bg-amber-500/10 rounded border border-amber-500/20">
                      {selectedMember.role}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 tracking-wider">
                      {selectedMember.meta}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
                    {selectedMember.name}
                  </h3>
                </div>

                {/* Direct Quote Box */}
                <div className={`p-4 rounded-xl border italic text-xs leading-relaxed ${
                  isDayMode 
                    ? "bg-emerald-500/5 border-emerald-500/20 text-stone-700" 
                    : "bg-emerald-500/10 border-emerald-500/30 text-emerald-200"
                }`}>
                  "{selectedMember.quote}"
                </div>

                <p className={`text-xs font-light leading-relaxed ${
                  isDayMode ? "text-stone-600" : "text-stone-300"
                }`}>
                  {selectedMember.desc}
                </p>

                {/* Skill Nodes */}
                <div className="pt-2">
                  <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block mb-2">
                    VERIFIED SKILL PROTOCOLS:
                  </span>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                    {selectedMember.skills.map((s: string) => (
                      <span 
                        key={s}
                        className="text-[9px] font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                      >
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-stone-500/10 flex items-center justify-between">
              <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                SECURE_HASH: 0x26_TEAM_{selectedMember.id}
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="px-5 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              >
                Close Inspect
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

