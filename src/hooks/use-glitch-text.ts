import { useState, useEffect } from "react";

export function useGlitchText(originalText: string, interval: number = 2000) {
  const [glitchText, setGlitchText] = useState(originalText);

  useEffect(() => {
    const glitchChars = [
      ...originalText.split(""),
      "§",
      "∞",
      "◊",
      "∆",
      "∑",
      "∂",
    ];

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        const randomText = Array.from(
          { length: originalText.length },
          () => glitchChars[Math.floor(Math.random() * glitchChars.length)]
        ).join("");
        setGlitchText(randomText);

        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, interval);

    return () => clearInterval(glitchInterval);
  }, [originalText, interval]);

  return glitchText;
}
