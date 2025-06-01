import { Card, CardContent } from "kel-ui-components";
import { Button } from "kel-ui-components";
import { SectionHeader } from "@/components/ui/section-header";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { OtherProjectCard } from "@/components/projects/OtherProjectCard";
import { useScrollAnimation } from "@/hooks/useAnimations";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { PROJECTS, OTHER_PROJECTS } from "@/data/constants";
import { motion } from "framer-motion";
import {
  staggerContainer,
  staggerItem,
  slideInFromBottom,
  scaleIn,
  cardHover,
} from "@/lib/animations";

export function Projects() {
  const { ref, controls } = useScrollAnimation(0.2);
  const { scrollToSection } = useSmoothScroll();

  return (
    <motion.section
      ref={ref}
      id="projects"
      className="py-20 bg-muted/30"
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerItem}>
            <SectionHeader
              title="Featured"
              highlightText="Projects"
              subtitle="A showcase of technical expertise and business impact through innovative solutions and modern development practices."
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {PROJECTS.map((project, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99],
                  },
                }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <motion.h3
                className="text-xl font-bold text-foreground mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                Other Web Development Projects
              </motion.h3>
              <motion.p
                className="text-sm text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                A collection of additional websites and experiments showcasing
                various web development skills and creative solutions.
              </motion.p>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {OTHER_PROJECTS.map((project, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.9 + index * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    },
                  }}
                >
                  <OtherProjectCard project={project} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            variants={slideInFromBottom}
            initial="hidden"
            animate={controls}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div variants={cardHover} initial="rest" whileHover="hover">
              <Card className="border-0 shadow-lg bg-gradient-to-r from-primary/5 to-purple-500/5 overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-500/5 to-pink-500/5"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(34, 211, 238, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))",
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05), rgba(34, 211, 238, 0.05))",
                      "linear-gradient(225deg, rgba(236, 72, 153, 0.05), rgba(34, 211, 238, 0.05), rgba(168, 85, 247, 0.05))",
                      "linear-gradient(315deg, rgba(34, 211, 238, 0.05), rgba(168, 85, 247, 0.05), rgba(236, 72, 153, 0.05))",
                    ],
                  }}
                  transition={{ duration: 8, repeat: Infinity }}
                />

                <CardContent className="p-8 relative z-10">
                  <motion.h3
                    className="text-xl font-bold mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Ready to Build Something Amazing?
                  </motion.h3>

                  <motion.p
                    className="text-muted-foreground mb-6 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    These projects represent just a fraction of what's possible.
                    Let's discuss how I can help your team deliver exceptional
                    user experiences and drive business success through modern
                    frontend development.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => scrollToSection("contact")}
                      className="bg-primary hover:bg-primary/90 relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10">Let's Work Together</span>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
