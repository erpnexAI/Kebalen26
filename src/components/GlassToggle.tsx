import { motion } from "motion/react";
import { Sun, Moon, GripHorizontal } from "lucide-react";
import { useRef } from "react";

interface GlassToggleProps {
  isDayMode: boolean;
  onToggle: () => void;
}

export function GlassToggle({ isDayMode, onToggle }: GlassToggleProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Invisible container covering the viewport to act as drag bounds */}
      <div ref={constraintsRef} className="fixed inset-6 pointer-events-none z-[49]" />

      <motion.div
        drag
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        dragMomentum={true}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.1 }}
        className={`fixed bottom-8 right-8 z-50 pointer-events-auto opacity-[0.85] hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1 p-1.5 pb-2.5 rounded-full backdrop-blur-md border shadow-2xl cursor-grab active:cursor-grabbing ${
          isDayMode 
            ? "bg-white/60 border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)]" 
            : "bg-black/60 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        }`}
      >
        <button
          onClick={onToggle}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 cursor-pointer border-none outline-none ${
            isDayMode ? "bg-white shadow-md text-amber-500" : "bg-stone-900 shadow-md text-emerald-400"
          }`}
          title={isDayMode ? "Ubah ke Mode Malam" : "Ubah ke Mode Siang"}
        >
          <motion.div
            key={isDayMode ? "sun" : "moon"}
            initial={{ scale: 0.6, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.6, rotate: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {isDayMode ? (
              <Sun className="w-5.5 h-5.5 fill-amber-100" />
            ) : (
              <Moon className="w-5.5 h-5.5 fill-emerald-950/40" />
            )}
          </motion.div>
        </button>

        {/* Dynamic mini-handle drag indicator */}
        <div className="flex flex-col items-center justify-center select-none pointer-events-none mt-1">
          <GripHorizontal className={`w-3.5 h-3.5 ${isDayMode ? "text-stone-400" : "text-stone-600"}`} />
          <span className={`text-[7px] font-mono font-bold tracking-tighter uppercase mt-0.5 scale-[0.85] ${
            isDayMode ? "text-stone-400" : "text-stone-500"
          }`}>
            DRAG
          </span>
        </div>
      </motion.div>
    </>
  );
}

