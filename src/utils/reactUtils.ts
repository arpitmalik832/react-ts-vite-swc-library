import { useState } from 'react';

import { VoidFunction } from '../types/types.d';

function useThrottle<T extends VoidFunction>(func: T, limit = 200) {
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
}

function useDebounce<T extends VoidFunction>(func: T, timeout = 200) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    if (args[0]?.nativeEvent && args[0].persist) {
      args[0].persist();
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

export { useDebounce, useThrottle };
