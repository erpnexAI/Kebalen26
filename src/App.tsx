/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassToggle } from "./components/GlassToggle";
import { LabSection } from "./components/LabSection";
import { VisionMissionSection } from "./components/VisionMissionSection";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);
  const [isLabOpen, setIsLabOpen] = useState(false);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);
  const navItems = ["Lab", "About", "Works", "News", "Contact"];

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
          <div className="hero">
          {isDayMode ? (
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/_zsRVbna2s8?autoplay=1&mute=1&loop=1&playlist=_zsRVbna2s8&controls=0&showinfo=0&modestbranding=1&enablejsapi=1&fs=0&iv_load_policy=3&disablekb=1"
                className="video-background-iframe"
                frameBorder="0"
                allow="autoplay; encrypted-media"
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
                src="https://www.youtube.com/embed/xMUlyzfhKp4?autoplay=1&mute=1&loop=1&playlist=xMUlyzfhKp4&controls=0&showinfo=0&modestbranding=1&enablejsapi=1&fs=0&iv_load_policy=3&disablekb=1"
                className="video-background-iframe"
                frameBorder="0"
                allow="autoplay; encrypted-media"
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

        {/* Navbar */}
        <nav className={`fixed top-0 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-12 px-8 h-[80px] mt-[9px] rounded-full backdrop-blur-xl border transition-all duration-300 ${isDayMode ? "bg-white/10 border-black/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] text-black" : "bg-black/10 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] text-[#E1E0CC]"}`}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={(e) => {
                e.preventDefault();
                if (item === "Lab") {
                  setIsLabOpen(true);
                } else if (item === "About") {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                } else {
                  triggerNotification(item);
                }
              }}
              className="text-sm font-medium transition-all hover:text-emerald-400 hover:scale-105 cursor-pointer bg-transparent border-none outline-none"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden fixed top-6 right-6 z-50 p-2 transition-colors ${isDayMode ? "text-black" : "text-primary"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30, cubicBezier: [0.4, 0, 0.2, 1] }}
              className={`fixed inset-0 z-40 flex flex-col justify-center items-center gap-8 ${isDayMode ? "bg-white text-black" : "bg-black text-primary"}`}
            >
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (item === "Lab") {
                      setIsLabOpen(true);
                    } else if (item === "About") {
                      setTimeout(() => {
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    } else {
                      triggerNotification(item);
                    }
                  }}
                  className="text-2xl font-medium cursor-pointer bg-transparent border-none outline-none"
                >
                  {item}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
              <p className={`text-[11px] sm:text-sm md:text-base leading-[1.4] font-serif italic transition-colors duration-500 ${isDayMode ? "text-black" : "text-primary"}`}>
                Exploring the intersection of technology, art, and human experience through iterative design and experimental prototyping.
              </p>
            </div>
            <GlassToggle isDayMode={isDayMode} onToggle={() => setIsDayMode(!isDayMode)} />
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div 
          onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <span className={`text-[10px] font-mono tracking-widest uppercase opacity-80 ${isDayMode ? "text-stone-700" : "text-stone-300"}`}>
            SCROLL DOWN
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className={`w-5 h-8 rounded-full border-2 flex justify-center p-1 ${isDayMode ? "border-stone-500" : "border-stone-400"}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isDayMode ? "bg-stone-700" : "bg-stone-300"}`} />
          </motion.div>
        </div>

        {/* Close of Hero Viewport Wrapper */}
        </div>

        {/* Vision Mission & Tagline Section */}
        <VisionMissionSection isDayMode={isDayMode} />

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

        {/* Experimental Lab Section Overlay */}
        <LabSection 
          isOpen={isLabOpen} 
          onClose={() => setIsLabOpen(false)} 
          isDayMode={isDayMode} 
          setIsDayMode={setIsDayMode} 
        />
      </div>
    </div>
  );
}
