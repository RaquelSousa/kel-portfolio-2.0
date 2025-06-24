import { MapPin, Zap, Code2 } from "lucide-react";
import { Badge } from "kel-ui-components";
import { MatrixBackground } from "@/components/hero/MatrixBackground";
import { TechStackDisplay } from "@/components/hero/TechStackDisplay";
import { CyberActionButtons } from "@/components/hero/CyberActionButtons";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useGlitchText } from "@/hooks/use-glitch-text";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { useScrollAnimation, useHoverAnimation } from "@/hooks/useAnimations";
import { useIsMobile } from "@/hooks/use-mobile";
import { TECH_STACK } from "@/data/constants";
import { motion } from "framer-motion";
import {
  pageVariants,
  staggerContainer,
  staggerItem,
  glitchReveal,
  slideInFromBottom,
  scaleIn,
  floatingElements,
} from "@/lib/animations";

export function Hero() {
  const mousePosition = useMousePosition();
  const glitchText = useGlitchText("Raquel");
  const { scrollToSection } = useSmoothScroll();
  const { ref, controls } = useScrollAnimation();
  const hoverAnimation = useHoverAnimation();
  const isMobile = useIsMobile();

  return (
    <motion.section
      ref={ref}
      id="home"
      className="min-h-screen relative overflow-hidden flex items-center pt-20 md:pt-24"
      aria-label="Introduction and hero section"
      variants={pageVariants}
      initial="hidden"
      animate={controls}
    >
      <MatrixBackground
        mousePosition={isMobile ? { x: 0, y: 0 } : mousePosition}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={scaleIn}>
            <Badge className="cyber-card border-cyan-400/50 bg-cyan-400/10 text-cyan-400 hover:bg-cyan-400/20 transition-colors">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className="w-3 h-3 mr-2" aria-hidden="true" />
              </motion.div>
              SYSTEM STATUS: AVAILABLE FOR DEPLOYMENT
            </Badge>
          </motion.div>

          <motion.div
            className="space-y-6 sm:space-y-8 mb-8 sm:mb-12"
            variants={staggerContainer}
          >
            <motion.div className="relative" variants={staggerItem}>
              <motion.h1
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight"
                variants={glitchReveal}
              >
                <motion.span
                  className="block text-foreground font-mono"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  INITIALIZE:
                </motion.span>
                <motion.span
                  className={`block cyber-text ${
                    glitchText !== "Raquel" ? "animate-glitch" : ""
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.5,
                    type: "spring",
                    stiffness: 100,
                  }}
                  style={{
                    animation: window.matchMedia(
                      "(prefers-reduced-motion: reduce)"
                    ).matches
                      ? "none"
                      : undefined,
                  }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {glitchText}
                </motion.span>
              </motion.h1>
            </motion.div>

            <motion.div className="relative" variants={staggerItem}>
              <motion.h2
                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 font-mono tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                &gt; CO-CEO_&_SENIOR_FRONTEND_DEVELOPER.exe
              </motion.h2>
              <motion.div
                className="absolute -right-2 sm:-right-4 top-1/2 -translate-y-1/2 w-2 sm:w-3 h-4 sm:h-6 bg-cyan-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                aria-hidden="true"
                style={{
                  animation: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                  ).matches
                    ? "none"
                    : undefined,
                }}
              />
            </motion.div>

            <motion.div
              className="cyber-card rounded-lg p-4 sm:p-6 max-w-3xl mx-auto"
              role="region"
              aria-label="Professional summary"
              variants={staggerItem}
              whileHover={
                !isMobile
                  ? {
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                      transition: { duration: 0.3 },
                    }
                  : {}
              }
              style={
                !isMobile
                  ? {
                      x: hoverAnimation.x,
                      y: hoverAnimation.y,
                      rotateX: hoverAnimation.rotateX,
                      rotateY: hoverAnimation.rotateY,
                    }
                  : {}
              }
              onMouseMove={
                !isMobile ? hoverAnimation.handleMouseMove : undefined
              }
              onMouseLeave={
                !isMobile ? hoverAnimation.handleMouseLeave : undefined
              }
            >
              <motion.p
                className="text-sm sm:text-lg md:text-xl text-cyan-100 leading-relaxed font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <motion.span
                  className="text-cyan-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  [SYSTEM_LOG]
                </motion.span>{" "}
                6+ YEARS CRAFTING EXCEPTIONAL DIGITAL EXPERIENCES
                <br className="hidden sm:block" />
                <span className="sm:hidden"> • </span>
                <motion.span
                  className="text-purple-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  [STACK]
                </motion.span>{" "}
                REACT • TYPESCRIPT • NEXT.JS
                <br className="hidden sm:block" />
                <span className="sm:hidden"> • </span>
                <motion.span
                  className="text-green-400"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  [STATUS]
                </motion.span>{" "}
                <span className="break-words">
                  BUILDING THE FUTURE, ONE COMPONENT AT A TIME • LEADING DIGITAL TRANSFORMATION
                </span>
              </motion.p>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-2 text-cyan-400 font-mono text-sm sm:text-base"
              variants={slideInFromBottom}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />
              </motion.div>
              <span className="text-xs sm:text-sm">
                &gt; LOCATION: LURGAN_NORTHERN_IRELAND
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInFromBottom}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-4 sm:px-0"
          >
            <CyberActionButtons
              onViewProjects={() => scrollToSection("projects")}
              onContact={() => scrollToSection("contact")}
            />
          </motion.div>

          <motion.div className="relative mb-16" variants={staggerItem}>
            <motion.div
              className="w-full h-2 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              aria-hidden="true"
              style={{
                animation: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "none"
                  : undefined,
              }}
            />
          </motion.div>

          <motion.div variants={staggerItem}>
            <TechStackDisplay techStack={TECH_STACK} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        role="button"
        aria-label="Scroll down to About section"
        tabIndex={0}
        onClick={() => scrollToSection("about")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            scrollToSection("about");
          }
        }}
        variants={floatingElements}
        animate="animate"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          className="cyber-card w-8 h-16 rounded-none flex flex-col items-center justify-center"
          whileHover={{
            boxShadow: "0 0 20px rgba(34, 211, 238, 0.5)",
            transition: { duration: 0.3 },
          }}
        >
          <motion.div
            className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-transparent"
            animate={{
              height: [24, 12, 24],
              opacity: [1, 0.5, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            aria-hidden="true"
            style={{
              animation: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "none"
                : undefined,
            }}
          />
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          >
            <Code2
              className="w-4 h-4 text-cyan-400 mt-2"
              aria-hidden="true"
              style={{
                animation: window.matchMedia("(prefers-reduced-motion: reduce)")
                  .matches
                  ? "none"
                  : undefined,
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
