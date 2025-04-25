// Framer Motion Animation Variants – Clean & Classy

// Simple fade-in from below with optional index-based delay
export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.5,
      ease: [0.25, 0.8, 0.25, 1], // smooth cubic-bezier
    },
  }),
};

// Basic fade-in with customizable delay
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.42, 0, 0.58, 1], // easeInOut for subtle entry
    },
  }),
};

// Container with staggered child animations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Scale and fade in with index-based stagger
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 1, 0.5, 1], // snappy spring-like ease
    },
  }),
};
