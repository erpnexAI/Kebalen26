/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassToggle } from "./components/GlassToggle";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDayMode, setIsDayMode] = useState(false);
  const navItems = ["Lab", "About", "Works", "News", "Contact"];

  const dayBg = "https://lh3.googleusercontent.com/d/1c4rED-PazUEGcIKgCJ7u79RUi1zg_M_j";
  const nightBg = "https://lh3.googleusercontent.com/d/19MKkIJMmEb5bxKUGVKzfV6r3Y58q5Td1";

  const themeClasses = isDayMode
    ? "bg-white text-black"
    : "bg-black text-[#E1E0CC]";
  const navClasses = isDayMode
    ? "bg-white/60 text-black border-black/10"
    : "bg-[#121212]/60 text-[#E1E0CC] border-white/10";

  return (
    <div className={`h-screen p-4 md:p-6 transition-colors duration-500 ${isDayMode ? "bg-white" : "bg-black"}`}>
      <div className={`relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden transition-colors duration-500 ${isDayMode ? "bg-white" : "bg-[#000000]"}`}>
        {/* Background */}
        <div className="hero">
          <div className="blur-overlay blur-overlay-top" />
          <div className="blur-overlay blur-overlay-bottom" />
          <div 
            className="hero-bg transition-all duration-500" 
            style={{ backgroundImage: `url('${isDayMode ? dayBg : nightBg}')` }} 
          />
        </div>

        {/* Navbar */}
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 backdrop-blur-md border rounded-full px-6 py-3 hidden md:flex gap-12 transition-colors duration-500 ${navClasses}`}>
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium transition-colors hover:text-emerald-400"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden absolute top-6 right-6 z-50 p-2 transition-colors ${isDayMode ? "text-black" : "text-primary"}`}
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
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href="#"
                  className="text-2xl font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 grid grid-cols-12 gap-8">
          {/* Left Column - Heading */}
          <div className="col-span-12 lg:col-span-8">
            <h1 className={`relative inline-block text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] transition-colors duration-500 ${isDayMode ? "text-black" : "text-[#E1E0CC]"}`}>
              Kebalen 26
              <span className="absolute top-[0.2em] right-[0.05em] text-[0.31em]">*</span>
            </h1>
          </div>

          {/* Right Column - Text + Button */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end gap-6">
            <p className={`text-xs sm:text-sm md:text-base leading-[1.2] font-serif italic transition-colors duration-500 ${isDayMode ? "text-black/70" : "text-primary/70"}`}>
              Exploring the intersection of technology, art, and human experience through iterative design and experimental prototyping.
            </p>
            <GlassToggle isDayMode={isDayMode} onToggle={() => setIsDayMode(!isDayMode)} />
          </div>
        </div>
      </div>
    </div>
  );
}
