import React, { useEffect, useRef } from 'react';

export interface DotFieldProps {
  dotRadius?: number;
  dotSpacing?: number;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  dotColor?: string;
  glowColor?: string;
  className?: string;
}

export const DotField: React.FC<DotFieldProps> = ({
  dotRadius = 1.5,
  dotSpacing = 14,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  dotColor = 'rgba(11, 25, 44, 0.08)',
  glowColor = 'rgba(197, 160, 89, 0.4)',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
    };

    const updateDimensions = () => {
      const parent = canvas.parentElement;
      const rect = parent ? parent.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
    };

    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // If canvas is fixed or full screen, map cursor coordinates
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = (
        mouse.targetX >= -100 &&
        mouse.targetX <= rect.width + 100 &&
        mouse.targetY >= -100 &&
        mouse.targetY <= rect.height + 100
      );
    };

    window.addEventListener('resize', updateDimensions, { passive: true });
    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse interpolation (LERP)
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * dotSpacing;
          const originY = r * dotSpacing;

          // Wave displacement (if enabled)
          let waveOffset = 0;
          if (waveAmplitude > 0) {
            waveOffset = Math.sin(time + originX * 0.05 + originY * 0.05) * waveAmplitude;
          }

          // Calculate distance to mouse
          const dx = originX - mouse.x;
          const dy = originY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let currentX = originX;
          let currentY = originY + waveOffset;
          let currentRadius = dotRadius;
          let currentAlpha = 1;

          // Bulge effect based on bulgeStrength & glowRadius
          if (glowRadius > 0 && dist < glowRadius && dist > 0) {
            const factor = (1 - dist / glowRadius);
            // Non-linear bulge push
            const displacement = Math.sin(factor * Math.PI) * (bulgeStrength * 0.25);
            currentX += (dx / dist) * displacement;
            currentY += (dy / dist) * displacement;
            currentRadius = dotRadius + factor * 0.8;
            currentAlpha = 1 + factor * 1.5;
          }

          // Sparkle effect (if enabled)
          if (sparkle) {
            const sparkleVal = Math.sin(time * 2 + originX * 11 + originY * 17);
            if (sparkleVal > 0.85) {
              currentRadius += 0.5;
            }
          }

          ctx.beginPath();
          ctx.arc(currentX, currentY, Math.max(0.5, currentRadius), 0, Math.PI * 2);

          if (glowRadius > 0 && dist < glowRadius * 0.7) {
            const glowFactor = (1 - dist / (glowRadius * 0.7));
            ctx.fillStyle = glowFactor > 0.4 ? glowColor : dotColor;
          } else {
            ctx.fillStyle = dotColor;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dotRadius, dotSpacing, bulgeStrength, glowRadius, sparkle, waveAmplitude, dotColor, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`block w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default DotField;
