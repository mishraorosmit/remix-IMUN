import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const initSmoothScroll = (): Lenis => {
  if (lenisInstance) return lenisInstance;

  // Initialize Lenis with rapid snappy response and zero sluggishness
  lenisInstance = new Lenis({
    duration: 0.45,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.15,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Connect Lenis scroll events to GSAP ScrollTrigger
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Sync GSAP's high-performance internal ticker with Lenis RAF
  const tickerUpdate = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(tickerUpdate);
  gsap.ticker.lagSmoothing(0);

  // Expose to window for debugging and programmatic external calls if needed
  if (typeof window !== 'undefined') {
    (window as any).__lenis = lenisInstance;
  }

  return lenisInstance;
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};

export const scrollToTop = (immediate: boolean = true) => {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
    lenisInstance.resize();
  }
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 30);
};

export const smoothScrollTo = (
  target: string | HTMLElement | number,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) => {
  if (target === 0 && options?.immediate) {
    scrollToTop(true);
    return;
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.immediate ? 0 : (options?.duration ?? 0.35),
      immediate: options?.immediate ?? false,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' });
    }
  }
};

export const destroySmoothScroll = () => {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
};
