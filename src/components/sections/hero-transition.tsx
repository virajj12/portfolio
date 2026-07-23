"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface HeroTransitionProps {
  hero: ReactNode;
  children: ReactNode;
}

export function HeroTransition({ hero, children }: HeroTransitionProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress of the main content sliding up over the hero
  // 'start end' means when the top of content hits the bottom of the viewport
  // 'start start' means when the top of content hits the top of the viewport
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -2]); // subtle rotation
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <div className="relative w-full">
      {/* Sticky Hero Background */}
      <motion.div
        style={{ scale, rotate, opacity }}
        className="sticky top-0 h-screen w-full overflow-hidden origin-top"
      >
        {hero}
      </motion.div>

      {/* Main Content that slides over */}
      <div
        ref={contentRef}
        className="relative z-10 w-full bg-background border-t border-white/5 rounded-t-[2rem] md:rounded-t-[3rem] shadow-2xl overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
