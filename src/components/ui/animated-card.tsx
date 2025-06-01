import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@kel/ui-components";
import { BaseProps, WithAnimation } from "@/types";
import { motion, MotionProps } from "framer-motion";

interface AnimatedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BaseProps,
    WithAnimation {
  index?: number;
  animationType?: "fade-in" | "fade-in-up" | "slide-in";
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      children,
      index = 0,
      animationDelay,
      animationType = "fade-in-up",
      ...props
    },
    ref
  ) => {
    const delay = animationDelay || `${index * 0.2}s`;

    return (
      <div
        className={cn(`animate-${animationType}`, className)}
        style={{ animationDelay: delay }}
      >
        <Card
          ref={ref}
          className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
          {...props}
        >
          {children}
        </Card>
      </div>
    );
  }
);

AnimatedCard.displayName = "AnimatedCard";
