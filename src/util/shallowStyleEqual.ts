import type { CSSProperties } from 'react';

export const shallowStyleEqual = (
  a: CSSProperties | undefined,
  b: CSSProperties | undefined
): boolean => {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  const keysA = Object.keys(a) as (keyof CSSProperties)[];
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  for (const k of keysA) {
    if ((a as Record<string, unknown>)[k as string] !== (b as Record<string, unknown>)[k as string]) {
      return false;
    }
  }
  return true;
}
