import { type ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "fade-in" | "scale-in";
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animationClasses: Record<string, string> = {
  "fade-up": "translate-y-10 opacity-0",
  "fade-down": "-translate-y-10 opacity-0",
  "fade-left": "translate-x-10 opacity-0",
  "fade-right": "-translate-x-10 opacity-0",
  "fade-in": "opacity-0",
  "scale-in": "scale-95 opacity-0",
};

const animationVisible: Record<string, string> = {
  "fade-up": "translate-y-0 opacity-100",
  "fade-down": "translate-y-0 opacity-100",
  "fade-left": "translate-x-0 opacity-100",
  "fade-right": "translate-x-0 opacity-100",
  "fade-in": "opacity-100",
  "scale-in": "scale-100 opacity-100",
};

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold,
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView({ threshold, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`${className} transition-all ease-out will-change-transform ${
        isInView ? animationVisible[animation] : animationClasses[animation]
      }`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
