import React from 'react';

type CallbackRef<T> = (element: T | null) => () => void;

const useRefEffect = <T>(callback: CallbackRef<T>) => {
  const cleanupRef = React.useRef<Function>(() => {});

  const refCallback = React.useCallback(
    (node: T) => {
      if (cleanupRef && cleanupRef.current) {
        // clean element if callback is different
        cleanupRef.current();
        cleanupRef.current = () => {};
      }

      const cleanupFunction = callback(node);
      if (cleanupFunction) {
        cleanupRef.current = cleanupFunction;
      }
    },
    [callback]
  );

  return refCallback;
};

export default useRefEffect;
