import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { motion } from "framer-motion";
import { Badge } from "@kel/ui-components";
import { BookOpen, Clock, Terminal, ArrowLeft } from "lucide-react";
import {
  pageVariants,
  staggerContainer,
  staggerItem,
  scaleIn,
} from "@/lib/animations";
import { usePageView } from "@/hooks/useAnalytics";
import { trackEvent } from "@/lib/analytics";
import { Link } from "react-router-dom";

const Blog = () => {
  usePageView("/blog", "Blog - Coming Soon");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    document.documentElement.classList.add("dark");

    trackEvent("page_loaded", {
      page: "blog",
      loadTime: performance.now(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    });

    return () => {
      document.documentElement.style.scrollBehavior = "auto";

      trackEvent("page_unloaded", {
        page: "blog",
        timeOnPage: performance.now(),
      });
    };
  }, []);

  return (
    <>
      <SEO
        title="Blog - Coming Soon | Raquel Sousa"
        description="Stay tuned for upcoming blog posts about React, TypeScript, and frontend development insights from Raquel Sousa."
        keywords={[
          "React Blog",
          "TypeScript",
          "Frontend Development",
          "Tech Blog",
          "Programming Insights",
          "Web Development",
        ]}
        type="website"
        url="https://raquelsousa.dev/blog"
        canonical="https://raquelsousa.dev/blog"
      />

      <Navigation />

      <main className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-gray-900/50 to-black/50">
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/5 via-transparent to-purple-600/5" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-8" variants={staggerItem}>
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-mono text-sm"
                aria-label="Back to homepage"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>&lt; RETURN_TO_HOME</span>
              </Link>
            </motion.div>

            <motion.div
              className="text-center space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={scaleIn}>
                <Badge className="cyber-card border-orange-400/50 bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 transition-colors">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Clock className="w-3 h-3 mr-2" aria-hidden="true" />
                  </motion.div>
                  SYSTEM STATUS: BLOG_MODULE_INITIALIZING
                </Badge>
              </motion.div>

              <motion.div className="space-y-4" variants={staggerItem}>
                <motion.h1
                  className="text-5xl md:text-7xl font-bold font-mono cyber-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  BLOG_SYSTEM
                </motion.h1>

                <motion.div
                  className="flex items-center justify-center gap-2 text-cyan-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Terminal className="h-6 w-6" />
                  <span className="font-mono text-xl">
                    &gt; COMING_SOON.exe
                  </span>
                  <motion.div
                    className="w-3 h-6 bg-cyan-400"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    aria-hidden="true"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                className="cyber-card rounded-lg p-8 max-w-2xl mx-auto"
                variants={staggerItem}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(34, 211, 238, 0.3)",
                  transition: { duration: 0.3 },
                }}
              >
                <motion.div
                  className="flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                >
                  <BookOpen className="h-16 w-16 text-cyan-400" />
                </motion.div>

                <motion.h2
                  className="text-3xl font-bold text-cyan-400 mb-4 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  [BLOG_MODULE_LOADING...]
                </motion.h2>

                <motion.div
                  className="space-y-4 text-cyan-100 font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <p className="text-lg leading-relaxed">
                    <span className="text-purple-400">[INFO]</span> Blog system
                    is currently under development.
                  </p>
                  <p className="text-lg leading-relaxed">
                    <span className="text-green-400">[PREVIEW]</span> Upcoming
                    content will include insights on:
                  </p>

                  <motion.ul
                    className="text-left space-y-2 mt-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {[
                      "React 19 & Advanced Patterns",
                      "TypeScript Best Practices",
                      "Performance Optimization",
                      "Component Architecture",
                      "Modern Frontend Tooling",
                      "Developer Experience",
                    ].map((topic, index) => (
                      <motion.li
                        key={topic}
                        className="flex items-center gap-3"
                        variants={staggerItem}
                        custom={index}
                      >
                        <span className="text-cyan-400">&gt;</span>
                        <span>{topic}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.div
                  className="mt-8 p-4 bg-cyan-400/5 border border-cyan-400/20 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                >
                  <p className="text-cyan-400 font-mono text-sm">
                    <span className="text-orange-400">[NOTIFICATION]</span>{" "}
                    Subscribe to updates via the contact form
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex flex-wrap items-center justify-center gap-6 text-sm font-mono"
                variants={staggerItem}
              >
                <Link
                  to="/#projects"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span>&gt; VIEW_PROJECTS</span>
                </Link>
                <span className="text-cyan-400/50">|</span>
                <Link
                  to="/#contact"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
                >
                  <span>&gt; CONTACT_ME</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
