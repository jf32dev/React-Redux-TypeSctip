import * as React from 'react';

const styles = {
  xs: 0,
  sm: 730,
  md: 965,
  lg: 1200,
  xl: 1380,
};

const calcViewport = (windowWidth: number): string => {
  if (windowWidth < +styles.sm) {
    return 'xs';
  }
  if (windowWidth >= +styles.sm && windowWidth < +styles.md) {
    return 'sm';
  }
  if (windowWidth >= +styles.md && windowWidth < +styles.lg) {
    return 'md';
  }
  if (windowWidth >= +styles.lg && windowWidth < +styles.xl) {
    return 'lg';
  }
  if (windowWidth >= +styles.xl) {
    return 'xl';
  }
  return '';
};

const getOrientation = () => {
  return document.documentElement.clientHeight >
    document.documentElement.clientWidth
    ? 'portrait'
    : 'landscape';
};
const useBreakpoint = () => {
  const [viewportSize, setViewportSize] = React.useState<string>(
    calcViewport(document.documentElement.clientWidth)
  );

  const [orientation, setOrientation] = React.useState<string>(
    getOrientation()
  );

  React.useEffect(() => {
    const calcBreakpoint = () => {
      // Changing this from window.innerWidth to documentElment.clientWidth
      // from some reason, in Mobile Platform particulary iOS WKWebView is not detecting
      // a change in size especially in orientation change.
      setViewportSize(calcViewport(document.documentElement.clientWidth));
      setOrientation(getOrientation());
    };

    window.addEventListener('resize', calcBreakpoint);
    return () => window.removeEventListener('resize', calcBreakpoint);
  }, []);

  return { viewportSize, orientation };
};

export default useBreakpoint;
