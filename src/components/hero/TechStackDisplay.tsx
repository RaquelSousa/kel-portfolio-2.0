export interface TechStackItem {
  name: string;
  color: string;
  icon: string;
}

interface TechStackDisplayProps {
  techStack: TechStackItem[];
}

export function TechStackDisplay({ techStack }: TechStackDisplayProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-cyan-400 uppercase tracking-wider font-mono">
        &gt; LOADED_MODULES:
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        {techStack.map((tech, index) => (
          <div
            key={tech.name}
            className="group relative animate-float-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="cyber-card px-4 py-2 rounded-none font-mono text-sm group-hover:neon-glow transition-all duration-300 cursor-default">
              <span className="text-cyan-400">[{tech.icon}]</span>
              <span className="text-cyan-100 ml-2">{tech.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
