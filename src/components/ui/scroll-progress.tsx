import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/useAnimations";

export function ScrollProgress() {
  const { scaleX } = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 transform-gpu z-50"
      style={{ scaleX, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
    />
  );
}

export function CircularScrollProgress() {
  const { scrollYProgress } = useScrollProgress();

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-16 h-16 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-muted-foreground/20"
        />

        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="8"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
          }}
          className="drop-shadow-lg"
        />

        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full" />
      </motion.div>
    </motion.div>
  );
}
