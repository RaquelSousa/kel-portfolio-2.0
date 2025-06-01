import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useAnimations";
import { progressBar } from "@/lib/animations";

interface AnimatedSkillBarProps {
  skill: string;
  percentage: number;
  icon?: React.ReactNode;
  color?: string;
  delay?: number;
}

export function AnimatedSkillBar({
  skill,
  percentage,
  icon,
  color = "#3b82f6",
  delay = 0,
}: AnimatedSkillBarProps) {
  const { ref, controls } = useScrollAnimation(0.5);

  return (
    <motion.div
      ref={ref}
      className="space-y-2"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && (
            <motion.div
              whileHover={{ scale: 1.2, rotate: 360 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          <span className="font-medium text-sm">{skill}</span>
        </div>
        <motion.span
          className="text-xs font-mono text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {percentage}%
        </motion.span>
      </div>

      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-0 rounded-full opacity-30"
          style={{ backgroundColor: color }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          style={{ backgroundColor: color }}
          variants={progressBar}
          custom={percentage}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: [-100, 200] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay + 1,
              ease: "linear",
            }}
            style={{ width: "50%" }}
          />

          <motion.div
            className="absolute right-0 top-0 h-full w-4 blur-sm opacity-75"
            style={{ backgroundColor: color }}
            animate={{ opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface SkillGridProps {
  skills: Array<{
    name: string;
    percentage: number;
    icon?: React.ReactNode;
    color?: string;
  }>;
}

export function SkillGrid({ skills }: SkillGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
        >
          <AnimatedSkillBar
            skill={skill.name}
            percentage={skill.percentage}
            icon={skill.icon}
            color={skill.color}
            delay={index * 0.1}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
