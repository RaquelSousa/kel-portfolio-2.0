import { Variants, Transition, MotionProps } from "framer-motion";

export const pageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInFromLeft: Variants = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInFromRight: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: {
    y: 50,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const scaleIn: Variants = {
  hidden: {
    scale: 0.8,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const rotateIn: Variants = {
  hidden: {
    rotate: -10,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const matrixEntry: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(10px)",
    scale: 1.1,
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const glitchReveal: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    skewX: 5,
    filter: "hue-rotate(90deg)",
  },
  visible: {
    opacity: 1,
    x: 0,
    skewX: 0,
    filter: "hue-rotate(0deg)",
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const cardHover: Variants = {
  rest: {
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  hover: {
    scale: 1.02,
    rotateY: 5,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const buttonPress: Variants = {
  rest: {
    scale: 1,
  },
  pressed: {
    scale: 0.95,
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const progressBar: Variants = {
  hidden: {
    width: "0%",
    opacity: 0,
  },
  visible: (percentage: number) => ({
    width: `${percentage}%`,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, -0.05, 0.01, 0.99],
      delay: 0.3,
    },
  }),
};

export const typewriter: Variants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "auto",
    transition: {
      duration: 2,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const smoothEase: Transition = {
  duration: 0.6,
  ease: [0.6, -0.05, 0.01, 0.99],
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

export const bounceTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 10,
};

export const slowSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const parallaxVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

export const loadingSpinner: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const morphingBox: Variants = {
  initial: {
    borderRadius: "50%",
    rotate: 0,
  },
  animate: {
    borderRadius: ["50%", "0%", "50%"],
    rotate: [0, 180, 360],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const floatingElements: Variants = {
  animate: {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const createStaggerDelay = (index: number, baseDelay = 0.1) => ({
  transition: {
    delay: index * baseDelay,
    duration: 0.6,
    ease: [0.6, -0.05, 0.01, 0.99],
  },
});

export const easeInOutCubic = [0.6, -0.05, 0.01, 0.99];
export const easeOutBack = [0.68, -0.55, 0.265, 1.55];
export const easeInOutBack = [0.68, -0.55, 0.265, 1.55];
