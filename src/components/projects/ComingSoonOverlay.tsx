import { motion } from "framer-motion";
import { Clock, Code2 } from "lucide-react";
import { Badge } from "kel-ui-components";

interface ComingSoonOverlayProps {
  progress: number;
  title: string;
}

export function ComingSoonOverlay({ progress, title }: ComingSoonOverlayProps) {
  return (
    <motion.div
      className="absolute inset-0 bg-background/95 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center z-10 border border-primary/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h3
        className="text-lg font-bold text-center mb-3 text-foreground"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        {title}
      </motion.h3>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <Badge
          variant="outline"
          className="mb-4 bg-primary/10 border-primary/30 text-primary"
        >
          <Clock className="mr-2 h-3 w-3" />
          Coming Soon
        </Badge>
      </motion.div>

      <motion.div
        className="text-center space-y-4 max-w-xs"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Code2 className="h-4 w-4" />
          <span className="text-sm font-medium">Development Progress</span>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        <motion.div
          className="text-2xl font-bold text-primary"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          {progress}%
        </motion.div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          This project is currently in active development. Check back soon for
          updates!
        </p>
      </motion.div>

      <motion.div
        className="absolute inset-0 opacity-5"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 2px,
            currentColor 2px,
            currentColor 4px
          )`,
        }}
      />
    </motion.div>
  );
}
