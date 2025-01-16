import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { errorLog, log } from '../utils/logsUtils';
import type { ReduxState, NavigationRedux } from '../redux/types';
import type { VoidFunctionWithParams } from '../types/types';
import { APP_UNMOUNT, BACK_CLICK } from '../enums/app';

const useBackPress = () => {
  const { stack } = useSelector<ReduxState, NavigationRedux>(
    state => state.navigation,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack({}));
    } else {
      const res = navigate(-1);
      if (res instanceof Promise) {
        res
          .then(() => {
            log(BACK_CLICK.SUCCESS);
          })
          .catch((err: Error) => {
            errorLog(BACK_CLICK.ERROR, err);
          });
      }
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log(APP_UNMOUNT);
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  const push = (callback: VoidFunctionWithParams) => {
    dispatch(pushStack(callback));
  };

  const pop = () => {
    handleBackPress();
  };

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack({}));
    }
  }, [stack]);

  return { stack, push, pop, clear };
};

export default useBackPress;
