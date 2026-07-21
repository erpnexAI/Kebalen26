import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";

interface GlassToggleProps {
  isDayMode: boolean;
  onToggle: () => void;
}

export function GlassToggle({ isDayMode, onToggle }: GlassToggleProps) {
  return (
    <motion.button
      onClick={onToggle}
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 opacity-[0.55] flex items-center p-1 rounded-full backdrop-blur-md border shadow-lg ${isDayMode ? "bg-white/40 border-black/10" : "bg-black/40 border-white/10"}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`w-10 h-10 rounded-full flex items-center justify-center ${isDayMode ? "bg-white" : "bg-black"}`}
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {isDayMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}
