'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ArticleProgress() {
  // Track scroll progress of the entire page
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-[60] pointer-events-none"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

