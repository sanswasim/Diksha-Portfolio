import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  className?: string;
  viewportAmount?: number;
}

export const MotionReveal: React.FC<MotionRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 0.55,
  className = '',
  viewportAmount = 0.15,
  ...props
}) => {
  const getOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: viewportAmount,
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth settling executive cubic bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
