import { useEffect, useRef } from "react";
import {
  useInView,
  useAnimation,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: threshold,
    once: true,
    margin: "0px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

export const useParallax = (offset = 50) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return y;
};

export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return { scrollYProgress, scaleX };
};

export const useHoverAnimation = () => {
  const x = useSpring(0, { stiffness: 300, damping: 30 });
  const y = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * 0.1;
    const deltaY = (event.clientY - centerY) * 0.1;

    x.set(deltaX);
    y.set(deltaY);
    rotateX.set(deltaY * -0.1);
    rotateY.set(deltaX * 0.1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return {
    x,
    y,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};

export const useTypewriter = (text: string, speed = 50) => {
  const controls = useAnimation();
  const displayedText = useRef("");
  const index = useRef(0);

  const startTyping = async () => {
    displayedText.current = "";
    index.current = 0;

    while (index.current < text.length) {
      displayedText.current += text[index.current];
      index.current++;

      await controls.start({
        opacity: [0, 1],
        transition: { duration: 0.1 },
      });

      await new Promise((resolve) => setTimeout(resolve, speed));
    }
  };

  return {
    displayedText: displayedText.current,
    startTyping,
    controls,
  };
};

export const useStaggerAnimation = (delay = 0.1) => {
  const controls = useAnimation();

  const startStagger = () => {
    controls.start((i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }));
  };

  return { controls, startStagger };
};

export const useMorphing = () => {
  const controls = useAnimation();

  const morphTo = (shape: string) => {
    const morphVariants = {
      circle: { borderRadius: "50%" },
      square: { borderRadius: "0%" },
      rounded: { borderRadius: "20px" },
    };

    return controls.start(
      morphVariants[shape as keyof typeof morphVariants] || morphVariants.square
    );
  };

  return { controls, morphTo };
};

export const useLoadingAnimation = (duration = 1) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls, duration]);

  return controls;
};

export const useDragAnimation = (
  constraintsRef?: React.RefObject<HTMLElement>
) => {
  const x = useSpring(0);
  const y = useSpring(0);
  const scale = useSpring(1);

  const handleDragStart = () => {
    scale.set(1.1);
  };

  const handleDragEnd = () => {
    scale.set(1);
    x.set(0);
    y.set(0);
  };

  return {
    x,
    y,
    scale,
    dragConstraints: constraintsRef,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    drag: true,
    dragElastic: 0.1,
  };
};

export const useIntersectionAnimation = (thresholds = [0.1, 0.5, 0.9]) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ratio = entry.intersectionRatio;

          if (ratio > 0.1 && ratio <= 0.5) {
            controls.start({ opacity: 0.5, scale: 0.95 });
          } else if (ratio > 0.5 && ratio <= 0.9) {
            controls.start({ opacity: 0.8, scale: 0.98 });
          } else if (ratio > 0.9) {
            controls.start({ opacity: 1, scale: 1 });
          }
        });
      },
      { threshold: thresholds }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [controls, thresholds]);

  return { ref, controls };
};
