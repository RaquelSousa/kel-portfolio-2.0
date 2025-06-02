import { motion } from "framer-motion";
import { ComingSoonOverlay } from "./ComingSoonOverlay";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "kel-ui-components";
import { Badge } from "kel-ui-components";
import { Button } from "kel-ui-components";
import { Github, ExternalLink } from "lucide-react";
import { useHoverAnimation } from "@/hooks/useAnimations";
import { Project } from "@/types";
import {
  cardHover,
  staggerContainer,
  staggerItem,
  scaleIn,
  buttonPress,
} from "@/lib/animations";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const hoverAnimation = useHoverAnimation();
  const isInProgress = project.status === "in-progress";

  return (
    <motion.div
      className="h-full"
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      style={{
        x: hoverAnimation.x,
        y: hoverAnimation.y,
        rotateX: hoverAnimation.rotateX,
        rotateY: hoverAnimation.rotateY,
      }}
      onMouseMove={hoverAnimation.handleMouseMove}
      onMouseLeave={hoverAnimation.handleMouseLeave}
    >
      <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute inset-0 border border-primary/20 rounded-lg opacity-0 group-hover:opacity-100"
          initial={{ scale: 0.8, opacity: 0 }}
          whileHover={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {isInProgress && project.progress && (
          <ComingSoonOverlay
            progress={project.progress}
            title={project.title}
          />
        )}

        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                  <motion.span
                    whileHover={{
                      backgroundImage:
                        "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.title}
                  </motion.span>
                </CardTitle>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </motion.div>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <motion.div
            className="space-y-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={staggerItem}>
              <h4 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-1">
                Problem
              </h4>
              <p className="text-sm text-muted-foreground">{project.problem}</p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h4 className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">
                Solution
              </h4>
              <p className="text-sm text-muted-foreground">
                {project.solution}
              </p>
            </motion.div>

            <motion.div variants={staggerItem}>
              <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-1">
                Impact
              </h4>
              <p className="text-sm text-muted-foreground">{project.impact}</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">
              Key Features
            </h4>
            <motion.div
              className="grid grid-cols-2 gap-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {project.features.map((feature, featureIndex) => (
                <motion.div
                  key={featureIndex}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                  variants={staggerItem}
                  whileHover={{
                    scale: 1.05,
                    color: "#3b82f6",
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.2 }}
                  />
                  {feature}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <h4 className="text-sm font-semibold mb-3 uppercase tracking-wide">
              Technologies
            </h4>
            <motion.div
              className="flex flex-wrap gap-2"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {project.technologies.map((tech, techIndex) => (
                <motion.div
                  key={techIndex}
                  variants={staggerItem}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant="outline"
                    className="text-xs hover:bg-primary/10 transition-colors cursor-pointer relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10">{tech}</span>
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex gap-3 pt-6 mt-6 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <motion.div
              variants={buttonPress}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
            >
              <Button
                variant="outline"
                size="sm"
                asChild={!isInProgress}
                disabled={isInProgress}
                className={isInProgress ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isInProgress ? (
                  <div className="relative overflow-hidden">
                    <Github className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Code</span>
                  </div>
                ) : (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Github className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Code</span>
                  </a>
                )}
              </Button>
            </motion.div>

            <motion.div
              variants={buttonPress}
              initial="rest"
              whileHover="hover"
              whileTap="pressed"
            >
              <Button
                variant="outline"
                size="sm"
                asChild={!isInProgress}
                disabled={isInProgress}
                className={isInProgress ? "opacity-50 cursor-not-allowed" : ""}
              >
                {isInProgress ? (
                  <div className="relative overflow-hidden">
                    <ExternalLink className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Demo</span>
                  </div>
                ) : (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/10"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <ExternalLink className="mr-2 h-4 w-4 relative z-10" />
                    <span className="relative z-10">Demo</span>
                  </a>
                )}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
