import { useMemo } from "react";

interface MatrixBackgroundProps {
  mousePosition: { x: number; y: number };
}

export function MatrixBackground({ mousePosition }: MatrixBackgroundProps) {
  const matrixRain = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        left: Math.random() * 100,
      })),
    []
  );

  return (
    <>
      <div className="matrix-bg">
        {matrixRain.map((drop) => (
          <div
            key={drop.id}
            className="absolute text-xs text-cyan-400/20 font-mono animate-data-stream"
            style={{
              left: `${drop.left}%`,
              animationDelay: `${drop.delay}s`,
              animationDuration: `${drop.duration}s`,
            }}
          >
            {Math.random() > 0.5 ? "1" : "0"}
          </div>
        ))}
      </div>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 hologram rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 hologram rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 hologram rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "4s" }}
        />

        <div
          className="absolute w-40 h-40 rounded-full pointer-events-none transition-all duration-300 neon-glow"
          style={{
            left: mousePosition.x - 80,
            top: mousePosition.y - 80,
            background:
              "radial-gradient(circle, rgba(0, 255, 255, 0.1) 0%, transparent 70%)",
          }}
        />

        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
        <div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-scan"
          style={{ animationDelay: "1.5s" }}
        />
      </div>
    </>
  );
}
