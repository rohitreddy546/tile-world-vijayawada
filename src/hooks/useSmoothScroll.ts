import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

// Global reference so components can trigger smooth programmatic sliding scroll
let globalLenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return globalLenisInstance;
}

export function scrollToTarget(
  target: string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (globalLenisInstance) {
    globalLenisInstance.scrollTo(target, {
      offset: options?.offset ?? -80,
      duration: options?.duration ?? 1.3,
      immediate: options?.immediate ?? false,
    });
  } else {
    // Fallback if Lenis is not active
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/**
 * Hook to provide buttery-smooth inertia sliding scroll physics
 * powered by Lenis across the entire architectural showroom web app.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect user's motion accessibility preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      // Exponential sliding deceleration ease curve for luxury smooth inertia
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      infinite: false,
    });

    lenisRef.current = lenis;
    globalLenisInstance = lenis;

    // Attach RAF loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks for silky smooth slide transitions
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#' || href === '#top') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.25 });
        return;
      }

      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -84, // Clear sticky architectural header
            duration: 1.35,
          });
        }
      } catch (_err) {
        // If invalid query selector, ignore
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if (globalLenisInstance === lenis) {
        globalLenisInstance = null;
      }
    };
  }, []);

  return lenisRef;
}
