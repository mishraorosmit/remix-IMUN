import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'alternate';
  index?: number;
  distance?: number;
  duration?: number;
  className?: string;
  showBlueprintHash?: boolean;
  withTilt?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  index,
  distance = 24,
  duration = 0.32,
  className = '',
  showBlueprintHash = false,
  withTilt = false,
  ...rest
}) => {
  const getEffectiveDirection = () => {
    if (direction === 'alternate' && typeof index === 'number') {
      return index % 2 === 0 ? 'left' : 'right';
    }
    return direction;
  };

  const getInitialPosition = () => {
    const dir = getEffectiveDirection();
    switch (dir) {
      case 'left':
        return { x: -distance, y: 0, rotate: 0 };
      case 'right':
        return { x: distance, y: 0, rotate: 0 };
      case 'up':
        return { x: 0, y: distance, rotate: 0 };
      case 'down':
        return { x: 0, y: -distance, rotate: 0 };
      default:
        return { x: 0, y: distance, rotate: 0 };
    }
  };

  const initialPos = getInitialPosition();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        rotate: initialPos.rotate,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        rotate: 0,
      }}
      viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.05 }}
      transition={{
        duration: Math.min(duration, 0.35),
        delay: Math.min(delay, 0.1),
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`relative will-change-transform ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
