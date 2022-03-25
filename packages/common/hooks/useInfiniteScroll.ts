import { throttle } from 'lodash';
import * as React from 'react';

type ReturnType<T> = [React.MutableRefObject<T | null>, () => void];

const useInfiniteScroll = <T extends HTMLElement>(
  onScrollEnd?: () => void,
  thresholdDistance: number = 200,
  wait: number = 1000
): ReturnType<T> => {
  // TODO: we might want to improve it by removing the item from the DOM that is not
  // inside the view otherwise we will one day reach 500 DOM items and laggy.
  // or use 3rd party library - use-infinite-scroll
  const ref = React.useRef<T | null>(null);

  const handleScroll = throttle(() => {
    if (ref.current) {
      const { clientHeight, scrollHeight, scrollTop } = ref.current as T;
      // if the difference between scrollable height and scrollable top minus table body height
      // is less than or equal the treshold then trigger scrollEnd.
      const totalScrollTop = scrollHeight - scrollTop - clientHeight;
      if (totalScrollTop <= thresholdDistance) {
        return onScrollEnd ? onScrollEnd() : null;
      }
    }

    return null;
  }, wait);

  // cleanup the ref.current
  React.useEffect(() => {
    return () => {
      ref.current = null;
    };
  }, []);

  return [ref, handleScroll];
};

export default useInfiniteScroll;
