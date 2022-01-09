import * as React from 'react';
import type { Dimensions } from '../types';

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = React.useState<Dimensions>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};
