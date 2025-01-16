import { useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDarkTheme, setLightTheme } from '../redux/slices/appSlice';
import preferredColorScheme from '../utils/eventListeners/preferredColorScheme';
import { THEME } from '../enums/app';
import type { ReduxState, AppRedux } from '../redux/types';

const useTheme = () => {
  const { theme } = useSelector<ReduxState, AppRedux>(state => state.app);
  const dispatch = useDispatch();

  const updateStore = useCallback((isDark: boolean) => {
    if (isDark) {
      if (theme !== THEME.DARK) {
        dispatch(setDarkTheme({}));
      }
    } else if (theme !== THEME.LIGHT) {
      dispatch(setLightTheme({}));
    }
  }, []);

  useLayoutEffect(() => {
    preferredColorScheme.subscribe(e => {
      updateStore(e.matches);
    });

    return () => {
      preferredColorScheme.unSubscribe();
    };
  }, []);
};

export default useTheme;
