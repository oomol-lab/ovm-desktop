import type { DependencyList, EffectCallback } from "react";

import { useEffect, useLayoutEffect } from "react";

export let useIsomorphicLayoutEffect = (
  effect: EffectCallback,
  deps?: DependencyList
): void => {
  // make it tree-shakable
  useIsomorphicLayoutEffect =
    typeof window === "undefined" ? useEffect : useLayoutEffect;
  return useIsomorphicLayoutEffect(effect, deps);
};
