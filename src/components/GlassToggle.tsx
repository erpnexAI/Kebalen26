import { motion } from "motion/react";
import { Sun, Moon, GripHorizontal } from "lucide-react";
import { useRef, type RefObject } from "react";

interface GlassToggleProps {
  isDayMode: boolean;
  onToggle: () => void;
  isVisible?: boolean;
  heroRef?: RefObject<HTMLDivElement | null>;
}

export function GlassToggle({ isDayMode, onToggle, isVisible = true, heroRef }: GlassToggleProps) {
  const fallbackRef = useRef<HTMLDivElement>(null);
  const constraintsRef = heroRef || fallbackRef;

  return (
    <>
      {!heroRef && (
        <div ref={fallbackRef} className="fixed inset-6 pointer-events-none z-[49]" />
      )}

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.15}
        dragTransition={{ power: 0.15, timeConstant: 150 }}
        whileHover={{ scale: isVisible ? 1.06 : 1 }}
        whileTap={{ scale: isVisible ? 0.94 : 1 }}
        whileDrag={{ scale: isVisible ? 1.08 : 1 }}
        animate={{
          opacity: isVisible ? 0.95 : 0,
          y: isVisible ? 0 : 20,
          scale: isVisible ? 1 : 0.9,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`fixed bottom-8 right-8 z-50 flex flex-col items-center gap-1.5 p-2 rounded-2xl backdrop-blur-xl border shadow-2xl transition-colors duration-300 ${
          isVisible ? "pointer-events-auto" : "pointer-events-none"
        } ${
          isDayMode 
            ? "bg-stone-900/40 border-stone-300/30 shadow-[0_8px_30px_rgba(0,0,0,0.15)] cursor-grab active:cursor-grabbing hover:opacity-100" 
            : "bg-black/60 border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing hover:opacity-100"
        }`}
      >
        <button 
          type="button"
          onClick={onToggle}
          className={`relative w-16 h-9 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-200 outline-none border-none ${
            isDayMode ? "bg-stone-800/60 border border-stone-500/30" : "bg-stone-900/80 border border-white/20"
          }`}
          title={isDayMode ? "Ubah ke Mode Malam" : "Ubah ke Mode Siang"}
        >
          <motion.div
            className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
              isDayMode ? "bg-amber-400 text-stone-950 shadow-amber-500/30" : "bg-emerald-400 text-stone-950 shadow-emerald-500/30"
            }`}
            animate={{ x: isDayMode ? 0 : 28 }}
            transition={{ type: "spring", stiffness: 600, damping: 28 }}
          >
            {isDayMode ? (
              <Sun className="w-4 h-4 text-stone-950 fill-amber-300 stroke-[2.5]" />
            ) : (
              <Moon className="w-4 h-4 text-stone-950 fill-emerald-300 stroke-[2.5]" />
            )}
          </motion.div>
        </button>

        {/* Dynamic mini-handle drag indicator */}
        <div className="flex items-center gap-1 select-none pointer-events-none opacity-60">
          <GripHorizontal className={`w-3.5 h-3.5 ${isDayMode ? "text-stone-300" : "text-stone-400"}`} />
          <span className={`text-[8px] font-mono font-bold tracking-wider uppercase ${
            isDayMode ? "text-stone-300" : "text-stone-400"
          }`}>
            DRAG
          </span>
        </div>
      </motion.div>
    </>
  );
}


