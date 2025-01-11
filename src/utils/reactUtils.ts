import { useState } from 'react';

import type { VoidFunctionWithParams } from '../types/types';

const useThrottle = <T extends VoidFunctionWithParams>(
  func: T,
  limit = 200,
) => {
  const [inThrottle, setInThrottle] = useState(false);

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      setInThrottle(true);
      setTimeout(() => {
        setInThrottle(false);
      }, limit);
    }
  };
};

const useDebounce = <T extends VoidFunctionWithParams>(
  func: T,
  timeout = 200,
) => {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
};

export { useDebounce, useThrottle };
