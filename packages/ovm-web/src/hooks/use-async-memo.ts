import type { DependencyList } from "react";

import { useState } from "react";
import { isPromise } from "~/misc/utils";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

export const useAsyncMemo = <T>(
  effect: (oldValue: T | undefined) => Promise<T> | T,
  deps: DependencyList = []
): T | undefined => {
  const [value, setValue] = useState<T | undefined>();

  useIsomorphicLayoutEffect(() => {
    let isValid = true;

    const maybePromise = effect(value);

    if (isPromise(maybePromise)) {
      void maybePromise.then(value => {
        if (isValid) {
          setValue(value);
        }
      });
    } else {
      setValue(maybePromise);
    }

    return () => {
      isValid = false;
    };
  }, deps);

  return value;
};
