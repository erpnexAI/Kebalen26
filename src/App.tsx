/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Menu, X, Sun, Moon, Mic, ShieldCheck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassToggle } from "./components/GlassToggle";
import { LabSection } from "./components/LabSection";
import { VisionMissionSection } from "./components/VisionMissionSection";
import { ProgramKegiatanSection } from "./components/ProgramKegiatanSection";
import { OurTeamSection } from "./components/OurTeamSection";
import { NewsSection } from "./components/NewsSection";
import { KataWargaSection } from "./components/KataWargaSection";
import { ContactSection } from "./components/ContactSection";
import { AdminPanelModal } from "./components/AdminPanelModal";

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const handleToggleMode = () => {
    setIsPulling(true);
    setIsDayMode(!isDayMode);
    setTimeout(() => {
      setIsPulling(false);
    }, 450);
  };
  
  const [dayVideoSrc, setDayVideoSrc] = useState<string>(() => localStorage.getItem("rw26_day_video") || "/bg-siang-kebalen.mp4");
  const [nightVideoSrc, setNightVideoSrc] = useState<string>(() => localStorage.getItem("rw26_night_video") || "/bg-malam-kebalen.mp4");

  useEffect(() => {
    const checkVideos = () => {
      const d = localStorage.getItem("rw26_day_video");
      const n = localStorage.getItem("rw26_night_video");
      if (d) setDayVideoSrc(d);
      if (n) setNightVideoSrc(n);
    };
    window.addEventListener("storage", checkVideos);
    const interval = setInterval(checkVideos, 1000);
    return () => {
      window.removeEventListener("storage", checkVideos);
      clearInterval(interval);
    };
  }, []);
  const navItems = [
    { label: "About", id: "about" },
    { label: "Programs", id: "programs" },
    { label: "Our Team", id: "team" },
    { label: "News", id: "news" },
    { label: "Kata Warga", id: "kata-warga" },
    { label: "Contact", id: "contact" }
  ];

  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      triggerNotification(targetId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle dark/light floating button visibility (only visible when in Hero section)
      if (window.scrollY > window.innerHeight * 0.45) {
        setIsHeroVisible(false);
      } else {
        setIsHeroVisible(true);
      }

      // Track active section for nav link highlights
      const scrollPos = window.scrollY + 200;
      let current = "";

      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            current = item.id;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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

  const handleIframeMute = (iframe: HTMLIFrameElement | null) => {
    if (!iframe) return;
    const sendMuteCommand = () => {
      try {
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "mute", args: [] }),
          "*"
        );
        iframe.contentWindow?.postMessage(
          JSON.stringify({ event: "command", func: "setVolume", args: [0] }),
          "*"
        );
      } catch (err) {
        // ignore
      }
    };

    sendMuteCommand();
    setTimeout(sendMuteCommand, 300);
    setTimeout(sendMuteCommand, 1000);
    setTimeout(sendMuteCommand, 2500);
  };

  return (
    <div className={`relative w-full min-h-screen transition-colors duration-500 ${isDayMode ? "bg-[#faf9f6]" : "bg-black"}`}>
      <div className="relative w-full">
        {/* Hero Viewport Wrapper */}
        <div ref={heroRef} className="relative w-full h-screen overflow-hidden">
          {/* Background */}
          <div className="hero bg-gradient-to-b from-black via-[#0d130e] to-black">
            {/* Fallback ambient poster background for instant 0ms visual render */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isDayMode ? "bg-gradient-to-br from-emerald-100/40 via-stone-200 to-white opacity-90" : "bg-gradient-to-br from-stone-950 via-emerald-950/20 to-black opacity-90"}`} />

          {isDayMode ? (
            <div className={`absolute inset-0 w-full h-full overflow-hidden bg-front ${isPulling ? "pull-down" : ""}`}>
              {dayVideoSrc.includes(".mp4") || dayVideoSrc.startsWith("/") || (dayVideoSrc.startsWith("http") && !dayVideoSrc.includes("youtube.com")) ? (
                <video
                  src={dayVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="video-background-iframe opacity-85 transition-opacity duration-1000 object-cover"
                />
              ) : (
                <iframe
                  src={dayVideoSrc}
                  className="video-background-iframe opacity-85 transition-opacity duration-1000"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="Day Mode Background Video"
                  onLoad={(e) => handleIframeMute(e.target as HTMLIFrameElement)}
                />
              )}
            </div>
          ) : (
            <div className={`absolute inset-0 w-full h-full overflow-hidden bg-front ${isPulling ? "pull-down" : ""}`}>
              {nightVideoSrc.includes(".mp4") || nightVideoSrc.startsWith("/") || (nightVideoSrc.startsWith("http") && !nightVideoSrc.includes("youtube.com")) ? (
                <video
                  src={nightVideoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="video-background-iframe opacity-85 transition-opacity duration-1000 object-cover"
                />
              ) : (
                <iframe
                  src={nightVideoSrc}
                  className="video-background-iframe opacity-85 transition-opacity duration-1000"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  loading="lazy"
                  title="Dark Mode Background Video"
                  onLoad={(e) => handleIframeMute(e.target as HTMLIFrameElement)}
                />
              )}
            </div>
          )}
        </div>

        {/* Navbar Wrapper with Authentic Glassmorphism */}
        <div className="fixed top-2.5 left-1/2 -translate-x-1/2 w-[88vw] max-w-[720px] z-50 p-[1.5px] rounded-[32px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-500 ease-in-out opacity-100 pointer-events-auto translate-y-0">
          {/* Glass Edge Specular Reflection Border */}
          <div className="absolute inset-0 rounded-[32px] border border-white/40 pointer-events-none z-20" />

          {/* Inner Nav Container */}
          <nav className={`relative z-10 flex items-center justify-between gap-1.5 sm:gap-3 px-3 sm:px-5 h-10 sm:h-11 rounded-[32px] backdrop-blur-2xl transition-all duration-300 ${
            isDayMode 
              ? "bg-white/70 border border-white/60 text-stone-900 shadow-[0_8px_32px_0_rgba(31,38,135,0.15),inset_0_1px_1px_0_rgba(255,255,255,0.9)]" 
              : "bg-black/60 border border-white/20 text-[#E1E0CC] shadow-[0_8px_32px_0_rgba(0,0,0,0.6),inset_0_1px_1px_0_rgba(255,255,255,0.35)]"
          }`}>
            {/* Mobile Brand Badge */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-1.5 pr-0.5 cursor-pointer group border-none bg-transparent"
              title="Kembali ke Hero"
            >
              <span className="font-mono font-bold text-[10px] sm:text-xs tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                RW 26
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-1.5 overflow-x-auto no-scrollbar scrollbar-none py-0.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`text-[10px] lg:text-[11px] font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full whitespace-nowrap ${
                      isActive
                        ? "bg-emerald-500/25 text-emerald-400 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.3)] font-bold scale-105"
                        : "text-current hover:text-emerald-400 hover:scale-105 border border-transparent"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Mic, Admin & Mobile Hamburger) */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              {/* AI Voice Conversation Icon Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsLabOpen(true);
                }}
                title="AI Voice Conversation"
                className="relative p-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all duration-300 cursor-pointer flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.3)] group"
              >
                <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                <span className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-emerald-300 text-[9px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-emerald-500/30">
                  AI Voice
                </span>
              </button>

              {/* Portal Admin Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsAdminOpen(true);
                }}
                title="Portal Admin & Handover Klien"
                className="relative p-1.5 rounded-full bg-stone-800/80 border border-stone-600/50 text-stone-300 hover:bg-stone-700 hover:text-emerald-400 transition-all duration-300 cursor-pointer flex items-center justify-center group"
              >
                <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:block absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 text-stone-200 text-[9px] font-mono rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-stone-700">
                  Admin
                </span>
              </button>

              {/* Mobile Hamburger Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full bg-stone-800/80 border border-white/20 text-white hover:bg-stone-700 transition-all cursor-pointer flex items-center justify-center ml-1"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4 text-stone-200" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Expanded Dropdown */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`md:hidden overflow-hidden mt-2 rounded-3xl border backdrop-blur-2xl ${
                  isDayMode
                    ? "bg-stone-900/95 border-white/20 text-white shadow-2xl"
                    : "bg-black/95 border-white/20 text-[#E1E0CC] shadow-2xl"
                }`}
              >
                <div className="p-4 space-y-1 font-sans">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileMenuOpen(false);
                          scrollToSection(item.id);
                        }}
                        className={`w-full text-left px-4 py-3.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-between border cursor-pointer touch-manipulation active:scale-[0.98] ${
                          isActive
                            ? "bg-emerald-500/25 text-emerald-400 border-emerald-500/40 font-bold"
                            : "hover:bg-emerald-500/10 hover:text-emerald-400 border-transparent hover:border-emerald-500/20 opacity-90"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-emerald-400 translate-x-1" : "opacity-50"}`} />
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>



        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 md:p-16 grid grid-cols-12 gap-4 sm:gap-8 opacity-55">
          {/* Left Column - Heading */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-end">
            <div className="inline-flex flex-col w-fit max-w-full">
              {/* Kebalen spread to match the width of RW26 with White Glassmorphism */}
              <div className={`flex justify-between w-full text-xs sm:text-base md:text-xl lg:text-2xl font-sans font-bold uppercase tracking-widest mb-1 sm:mb-3 px-3 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl border backdrop-blur-lg transition-all duration-500 ${
                isDayMode 
                  ? "bg-white/30 border-white/50 text-emerald-600 shadow-[0_8px_32px_rgba(255,255,255,0.2)]" 
                  : "bg-white/15 border-white/20 text-[#E1E0CC] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
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
            <GlassToggle isDayMode={isDayMode} onToggle={handleToggleMode} isVisible={isHeroVisible} heroRef={heroRef} />
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

        {/* Testimonial & Suara Komunitas Section */}
        <KataWargaSection isDayMode={isDayMode} />

        {/* Contact Us Section */}
        <ContactSection isDayMode={isDayMode} />

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
