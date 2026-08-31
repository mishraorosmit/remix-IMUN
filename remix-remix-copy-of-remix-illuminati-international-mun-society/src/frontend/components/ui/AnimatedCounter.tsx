import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  prefix = '',
  suffix = '',
  duration = 500,
  className = '',
  decimals = 0,
}) => {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentVal = easeOut * end;
            
            setCount(currentVal);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(end);
            }
          };

          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [end, duration, hasAnimated]);

  const formattedNumber = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={elementRef} className={`inline-block tabular-nums ${className}`}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
};
