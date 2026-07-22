/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Menu, X, Sun, Moon, Mic, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassToggle } from "./components/GlassToggle";
import { LabSection } from "./components/LabSection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { ProgramKegiatanSection } from "./components/ProgramKegiatanSection";
import { OurTeamSection } from "./components/OurTeamSection";
import { NewsSection } from "./components/NewsSection";
import { AdminPanelModal } from "./components/AdminPanelModal";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const navItems = ["About", "Programs", "Our Team", "News"];

  useEffect(() => {
    const handleScroll = () => {
      // Hide nav when scrolling past page 1 (hero section) into page 2 and beyond
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerNotification = (item: string) => {
    setActiveNotification(item);
    const timer = setTimeout(() => {
      setActiveNotification(null);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const themeClasses = isDayMode
    ? "bg-white text-black"
    : "bg-black text-[#E1E0CC]";
  const navClasses = isDayMode
    ? "bg-white/60 text-black border-black/10"
    : "bg-[#121212]/60 text-[#E1E0CC] border-white/10";

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-500 ${isDayMode ? "bg-[#faf9f6]" : "bg-black"}`}>
      <div className="relative w-full">
        {/* Hero Viewport Wrapper */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background */}
          <div className="hero bg-gradient-to-b from-black via-[#0d130e] to-black">
            {/* Fallback ambient poster background for instant 0ms visual render */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDayMode ? "bg-gradient-to-br from-emerald-100/40 via-stone-200 to-white opacity-90" : "bg-gradient-to-br from-stone-950 via-emerald-950/20 to-black opacity-90"}`} />

          {isDayMode ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/KCIFLPstg_4?autoplay=1&mute=1&loop=1&playlist=KCIFLPstg_4&controls=0&showinfo=0&modestbranding=1&enablejsapi=1&fs=0&iv_load_policy=3&disablekb=1"
                className="video-background-iframe opacity-85 transition-opacity duration-1000"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                loading="lazy"
                title="Day Mode Background Video"
                onLoad={(e) => {
                  try {
                    const iframe = e.target as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage(JSON.stringify({
                      event: "command",
                      func: "mute",
                      args: []
                    }), "*");
                    iframe.contentWindow?.postMessage(JSON.stringify({
                      event: "command",
                      func: "setVolume",
                      args: [0]
                    }), "*");
                  } catch (err) {
                    console.error("Muting iframe failed", err);
                  }
                }}
              />
            </div>
          ) : (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/stOUY3bMvxA?autoplay=1&mute=1&loop=1&playlist=stOUY3bMvxA&controls=0&showinfo=0&modestbranding=1&enablejsapi=1&fs=0&iv_load_policy=3&disablekb=1"
                className="video-background-iframe opacity-85 transition-opacity duration-1000"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                loading="lazy"
                title="Dark Mode Background Video"
                onLoad={(e) => {
                  try {
                    const iframe = e.target as HTMLIFrameElement;
                    iframe.contentWindow?.postMessage(JSON.stringify({
                      event: "command",
                      func: "mute",
                      args: []
                    }), "*");
                    iframe.contentWindow?.postMessage(JSON.stringify({
                      event: "command",
                      func: "setVolume",
                      args: [0]
                    }), "*");
                  } catch (err) {
                    console.error("Muting iframe failed", err);
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Navbar Wrapper with Rotating Light Frame & Authentic Glassmorphism (80% Scale with Smooth Fade Out on Scroll) */}
        <div className={`fixed top-3 left-1/2 -translate-x-1/2 scale-[0.80] origin-top z-50 p-[1.5px] rounded-[40px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-in-out ${
          isNavHidden 
            ? "opacity-0 pointer-events-none -translate-y-6" 
            : "opacity-100 pointer-events-auto translate-y-0"
        }`}>
          {/* Rotating Soft White Light Beam */}
          <div className="absolute top-1/2 left-1/2 w-[350%] h-[600%] -translate-x-1/2 -translate-y-1/2 animate-silver-spin bg-[conic-gradient(from_0deg,transparent_0deg_200deg,rgba(255,255,255,0.05)_230deg,rgba(255,255,255,0.95)_290deg,rgba(255,255,255,0.3)_330deg,transparent_360deg)] pointer-events-none opacity-100" />
          
          {/* Glass Edge Specular Reflection Border */}
          <div className="absolute inset-0 rounded-[40px] border border-white/40 pointer-events-none z-20" />

          {/* Inner Nav Container - Pure Glassmorphism Effect */}
          <nav className={`relative z-10 flex items-center gap-4 sm:gap-8 md:gap-12 px-6 sm:px-9 h-12 sm:h-16 rounded-[40px] backdrop-blur-xl transition-all duration-300 ${
            isDayMode 
              ? "bg-white/30 border border-white/50 text-stone-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.12),inset_0_1px_1px_0_rgba(255,255,255,0.9)]" 
              : "bg-black/35 border border-white/20 text-[#E1E0CC] shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.35)]"
          }`}>
            {navItems.map((item) => (
              <button
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  if (item === "Lab") {
                    setIsLabOpen(true);
                  } else if (item === "About") {
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  } else if (item === "Programs") {
                    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
                  } else if (item === "Our Team") {
                    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
                  } else if (item === "News") {
                    document.getElementById("news")?.scrollIntoView({ behavior: "smooth" });
                  } else {
                    triggerNotification(item);
                  }
                }}
                className="text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all hover:text-emerald-400 hover:scale-105 cursor-pointer bg-transparent border-none outline-none whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
              >
                {item}
              </button>
            ))}

            {/* AI Voice Conversation Icon Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsLabOpen(true);
              }}
              title="AI Voice Conversation"
              className="relative p-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 cursor-pointer flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] group"
            >
              <Mic className="w-4 h-4 animate-pulse" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-emerald-300 text-[9px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/30">
                AI Voice
              </span>
            </button>

            {/* Portal Admin & Client Handover Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsAdminOpen(true);
              }}
              title="Portal Admin & Handover Klien"
              className="relative p-2 rounded-full bg-stone-800/80 border border-stone-600/50 text-stone-300 hover:bg-stone-700 hover:text-emerald-400 transition-all duration-300 cursor-pointer flex items-center justify-center group"
            >
              <ShieldCheck className="w-4 h-4" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-stone-200 text-[9px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-700">
                Admin
              </span>
            </button>
          </nav>
        </div>



        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 grid grid-cols-12 gap-4 sm:gap-8 opacity-55">
          {/* Left Column - Heading */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-end">
            <div className="inline-flex flex-col w-fit max-w-full">
              {/* Kebalen spread to match the width of RW26 with Glassmorphism */}
              <div className={`flex justify-between w-full text-xs sm:text-base md:text-xl lg:text-2xl font-sans font-bold uppercase tracking-widest mb-1 sm:mb-3 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border backdrop-blur-md transition-all duration-500 ${
                isDayMode 
                  ? "bg-emerald-500/20 border-emerald-500/30 text-white/65 shadow-[0_4px_12px_rgba(16,185,129,0.15)]" 
                  : "bg-black/30 border-white/10 text-[#E1E0CC]/80 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              }`}>
                <span>K</span>
                <span>E</span>
                <span>B</span>
                <span>A</span>
                <span>L</span>
                <span>E</span>
                <span>N</span>
              </div>
              <h1 className={`relative inline-block italic font-bodoni text-[60px] sm:text-[100px] md:text-[130px] lg:text-[150px] leading-[0.85] tracking-[-0.05em] transition-colors duration-500 ${isDayMode ? "text-emerald-600" : "text-[#E1E0CC]"}`}>
                RW26
                <span className="absolute top-[0.15em] right-[0.05em] text-[0.31em]">*</span>
              </h1>
            </div>
          </div>

          {/* Right Column - Text + Button */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-4 sm:gap-6">
            <div className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border backdrop-blur-lg transition-all duration-500 ${
              isDayMode 
                ? "bg-white/30 border-white/50 shadow-[0_8px_32px_rgba(255,255,255,0.2)]" 
                : "bg-black/40 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
            }`}>
              <p className={`text-[11px] sm:text-xs md:text-sm leading-[1.4] font-serif italic text-center transition-colors duration-500 ${isDayMode ? "text-black" : "text-primary"}`}>
                "Bekerjalah kamu, maka Allah dan Rasul-Nya serta orang-orang mukmin akan melihat pekerjaanmu itu & kamu akan dikembalikan kepada (Allah) Yang Mengetahui akan yang ghaib & yang nyata, lalu Diberitakan-Nya kepada kamu apa yang telah kamu kerjakan."
              </p>
            </div>
            <GlassToggle isDayMode={isDayMode} onToggle={() => setIsDayMode(!isDayMode)} />
          </div>
        </div>



        {/* Close of Hero Viewport Wrapper */}
        </div>

        {/* Vision Mission & Tagline Section */}
        <VisionMissionSection isDayMode={isDayMode} />

        {/* Program Kegiatan (Expanding Accordion Cards) */}
        <ProgramKegiatanSection isDayMode={isDayMode} />

        {/* Our Team Section */}
        <OurTeamSection isDayMode={isDayMode} />

        {/* News & Blog Section */}
        <NewsSection isDayMode={isDayMode} />

        {/* Custom Premium Toast/Notification */}
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 bg-black/85 border-emerald-500/30 text-[#E1E0CC]"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs sm:text-sm font-medium">
                Materi <span className="text-emerald-400 font-bold">{activeNotification}</span> Balai Warga dalam pengembangan desain.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Quick Admin Trigger Button */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-4 right-4 z-40 px-3.5 py-2 rounded-full bg-stone-900/90 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-mono font-bold group cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:text-black" />
          <span className="hidden sm:inline">Portal Admin RW26</span>
        </button>

        {/* AI Voice Conversation Modal */}
        <LabSection 
          isOpen={isLabOpen} 
          onClose={() => setIsLabOpen(false)} 
          isDayMode={isDayMode} 
          setIsDayMode={setIsDayMode} 
        />

        {/* Admin & Client Handover Panel Modal */}
        <AdminPanelModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
          isDayMode={isDayMode}
        />
      </div>
    </div>
  );
}
