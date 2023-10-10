export const isPromise = <T>(
  value: T | PromiseLike<T>
): value is PromiseLike<T> =>
  value && typeof (value as PromiseLike<T>).then === "function";

export const noop = () => {};

const invoke = (fn?: (() => unknown) | null): void => {
  try {
    fn?.();
  } catch (e) {
    console.error(e);
  }
};

export const joinDisposers =
  (
    ...disposers: ReadonlyArray<(() => void) | undefined | null>
  ): (() => void) =>
  () =>
    disposers.forEach(invoke);
