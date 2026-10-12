import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react';

const STIFFNESS = 328;
const DAMPING = 22;
const MASS = 0.84;
// Slot index, not pixels. 100% of the column is one digit, so a 0.004 slot
// miss is a few hundredths of a pixel at the sizes this counter uses.
const REST_POS_EPS = 0.004;
const REST_VEL_EPS = 0.004;
const MAX_DT_SEC = 1 / 30;
const MAX_SUBSTEPS_PER_FRAME = 6;
const VELOCITY_BLEND_ON_RETARGET = 0.5;

let reducedMotionMql: MediaQueryList | null = null;

const getReducedMotion = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }
  if (!reducedMotionMql) {
    reducedMotionMql = window.matchMedia('(prefers-reduced-motion: reduce)');
  }
  return reducedMotionMql.matches;
}

export type SpringColumnOptions = {
  onSettled?: () => void;
  layoutClassName?: string;
};

export type SpringColumnTransformResult = {
  ref: RefObject<HTMLDivElement>;
  ssrTransformStyle: CSSProperties | undefined;
};

const columnTransform = (slots: number): string => {
  const percent = Object.is(slots, -0) ? 0 : slots * 100;
  return `translate3d(0, ${percent}%, 0)`;
};

export const useSpringColumnTransform = (
  targetSlot: number,
  options?: SpringColumnOptions
): SpringColumnTransformResult => {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef(targetSlot);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const settleGenRef = useRef(0);
  const onSettledRef = useRef(options?.onSettled);
  onSettledRef.current = options?.onSettled;
  const layoutClassName = options?.layoutClassName ?? '';

  const targetRef = useRef(targetSlot);
  targetRef.current = targetSlot;

  const safeTarget = Number.isFinite(targetSlot) ? targetSlot : 0;

  const [jsOwnsTransform, setJsOwnsTransform] = useState(false);

  useLayoutEffect(() => {
    if (jsOwnsTransform) {
      return;
    }
    const el = ref.current;
    if (!el) {
      return;
    }
    const t = Number.isFinite(targetRef.current) ? targetRef.current : 0;
    posRef.current = t;
    velRef.current = 0;
    el.style.transform = columnTransform(t);
    setJsOwnsTransform(true);
  }, [jsOwnsTransform]);

  useLayoutEffect(() => {
    if (!jsOwnsTransform) {
      return;
    }
    const el = ref.current;
    if (el) {
      el.style.transform = columnTransform(posRef.current);
    }
  }, [jsOwnsTransform, layoutClassName]);

  useEffect(() => {
    if (!jsOwnsTransform) {
      return;
    }

    const el = ref.current;
    if (!el) {
      return;
    }

    cancelAnimationFrame(rafRef.current);
    lastTimeRef.current = null;

    settleGenRef.current += 1;
    const settleGeneration = settleGenRef.current;

    const notifySettled = () => {
      if (settleGeneration === settleGenRef.current) {
        onSettledRef.current?.();
      }
    };

    if (getReducedMotion()) {
      const start = posRef.current;
      const t0 = performance.now();
      const durationMs = 260;

      const tick = (now: number) => {
        const t = Math.min(1, (now - t0) / durationMs);
        const eased =
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const x = start + (safeTarget - start) * eased;
        posRef.current = x;
        el.style.transform = columnTransform(x);
        if (t >= 1) {
          posRef.current = safeTarget;
          velRef.current = 0;
          el.style.transform = columnTransform(safeTarget);
          notifySettled();
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafRef.current);
    }

    velRef.current *= VELOCITY_BLEND_ON_RETARGET;

    const tick = (now: number) => {
      const last = lastTimeRef.current;
      let dt = last == null ? 1 / 60 : (now - last) / 1000;
      lastTimeRef.current = now;
      dt = Math.min(dt, MAX_DT_SEC);

      let x = posRef.current;
      let v = velRef.current;
      const target = safeTarget;
      const steps = Math.min(
        MAX_SUBSTEPS_PER_FRAME,
        Math.max(1, Math.ceil(dt * 90))
      );
      const subDt = dt / steps;

      for (let s = 0; s < steps; s++) {
        const disp = target - x;
        const a = (STIFFNESS * disp - DAMPING * v) / MASS;
        v += a * subDt;
        x += v * subDt;
      }

      posRef.current = x;
      velRef.current = v;
      el.style.transform = columnTransform(x);

      if (
        Math.abs(target - x) < REST_POS_EPS &&
        Math.abs(v) < REST_VEL_EPS
      ) {
        posRef.current = target;
        velRef.current = 0;
        el.style.transform = columnTransform(target);
        notifySettled();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [safeTarget, jsOwnsTransform]);

  const ssrTransformStyle: CSSProperties | undefined = jsOwnsTransform
    ? undefined
    : { transform: columnTransform(safeTarget) };

  return { ref, ssrTransformStyle };
}
