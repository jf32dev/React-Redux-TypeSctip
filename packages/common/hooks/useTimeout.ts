import React from 'react';

type TCancelTimer = () => void;
type TUseTimeout = (
  callback: () => void,
  time: number,
  deps?: unknown[]
) => TCancelTimer;

const useTimeout: TUseTimeout = (callback, time, deps = []): TCancelTimer => {
  const refCallback = React.useRef<() => void>(() => {});

  const refTimeout = React.useRef<number>();

  const cancel: TCancelTimer = React.useCallback(() => {
    if (refTimeout && refTimeout.current) {
      window.clearTimeout(refTimeout.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  React.useEffect(() => {
    refCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    // use of window.setTimeout to avoid mismatching typescript types
    // https://github.com/Microsoft/TypeScript/issues/30128
    refTimeout.current = window.setTimeout(refCallback.current, time);
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return cancel;
};

export default useTimeout;
