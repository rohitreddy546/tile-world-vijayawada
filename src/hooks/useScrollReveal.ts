import { useEffect } from 'react';

/**
 * Hook to trigger scroll reveals on elements with `.tw-reveal` or `.tw-reveal-scale` classes.
 * Uses IntersectionObserver with a gentle threshold and unobserves once revealed.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Check for prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.tw-reveal, .tw-reveal-scale').forEach((el) => {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Unobserve after entrance animation to prevent repetitive re-triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const elements = document.querySelectorAll('.tw-reveal, .tw-reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
}
