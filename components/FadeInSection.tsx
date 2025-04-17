"use client";

import React from "react";
import { useInView } from "../hooks/useInView";

type TFadeInSectionProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up";
};

export const FadeInSection: React.FC<TFadeInSectionProps> = ({
  children,
  className = "",
  direction = "up",
}) => {
  const { ref, isIntersecting } = useInView({
    threshold: 0.1,
  });

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const animationClassMap: Record<string, string> = {
    left: "animate-fade-in-left",
    right: "animate-fade-in-right",
    up: "animate-fade-in-up",
  };

  let animationClass = animationClassMap[direction] || "";

  if (prefersReducedMotion) {
    animationClass = "opacity-1";
  }

  return (
    <div
      ref={ref}
      className={`opacity-0 transition-opacity duration-700 ${
        isIntersecting ? animationClass : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
