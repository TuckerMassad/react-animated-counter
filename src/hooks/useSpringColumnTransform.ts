import { useEffect, useRef, type RefObject } from 'react';

const STIFFNESS = 420;
const DAMPING = 11;
const MASS = 0.62;
const REST_POS_EPS = 0.1;
const REST_VEL_EPS = 0.1;
const MAX_DT_SEC = 1 / 30;

export type SpringColumnOptions = {
  onSettled?: () => void;
};

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export const useSpringColumnTransform = (
  targetY: number,
  options?: SpringColumnOptions
): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef(targetY);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const didInitRef = useRef(false);
  const onSettledRef = useRef(options?.onSettled);
  onSettledRef.current = options?.onSettled;

  const safeTarget = Number.isFinite(targetY) ? targetY : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!didInitRef.current) {
      didInitRef.current = true;
      posRef.current = safeTarget;
      velRef.current = 0;
      el.style.transform = `translate3d(0, ${safeTarget}px, 0)`;
      return;
    }

    cancelAnimationFrame(rafRef.current);
    lastTimeRef.current = null;

    if (prefersReducedMotion()) {
      const start = posRef.current;
      const t0 = performance.now();
      const durationMs = 200;

      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / durationMs);
        const eased = 1 - (1 - t) ** 3;
        const x = start + (safeTarget - start) * eased;
        posRef.current = x;
        el.style.transform = `translate3d(0, ${x}px, 0)`;
        if (t >= 1) {
          posRef.current = safeTarget;
          velRef.current = 0;
          el.style.transform = `translate3d(0, ${safeTarget}px, 0)`;
          onSettledRef.current?.();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }

    const tick = (now: number) => {
      const last = lastTimeRef.current;
      let dt = last == null ? 1 / 60 : (now - last) / 1000;
      lastTimeRef.current = now;
      dt = Math.min(dt, MAX_DT_SEC);

      let x = posRef.current;
      let v = velRef.current;
      const target = safeTarget;
      const steps = Math.max(1, Math.ceil(dt / (1 / 120)));
      const subDt = dt / steps;

      for (let s = 0; s < steps; s++) {
        const disp = target - x;
        const a = (STIFFNESS * disp - DAMPING * v) / MASS;
        v += a * subDt;
        x += v * subDt;
      }

      posRef.current = x;
      velRef.current = v;
      el.style.transform = `translate3d(0, ${x}px, 0)`;

      if (
        Math.abs(target - x) < REST_POS_EPS &&
        Math.abs(v) < REST_VEL_EPS
      ) {
        posRef.current = target;
        velRef.current = 0;
        el.style.transform = `translate3d(0, ${target}px, 0)`;
        onSettledRef.current?.();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [safeTarget]);

  return ref;
}
