import { cn } from "@/lib/utils";
import { BaseProps, WithAnimation } from "@/types";

interface SectionHeaderProps extends BaseProps, WithAnimation {
  title: string;
  subtitle?: string;
  highlightText?: string;
}

export function SectionHeader({
  title,
  subtitle,
  highlightText,
  className,
  animationDelay = "0s",
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("text-center mb-16 animate-fade-in", className)}
      style={{ animationDelay }}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}{" "}
        {highlightText && (
          <span className="text-gradient">{highlightText}</span>
        )}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
