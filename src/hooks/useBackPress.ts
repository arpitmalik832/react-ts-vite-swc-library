import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  clearStack,
  popStack,
  pushStack,
} from '../redux/slices/navigationSlice';
import beforeUnload from '../utils/eventListeners/beforeUnload';
import { log } from '../utils/logsUtils';
import { ReduxState, NavigationRedux, VoidFunction } from '../types/types.d';

function useBackPress() {
  const { stack } = useSelector<ReduxState, NavigationRedux>(
    state => state.navigation,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackPress = useCallback(() => {
    if (stack.length) {
      dispatch(popStack(undefined));
    } else {
      navigate(-1);
    }
  }, [stack]);

  window.backPress = handleBackPress;

  useEffect(() => {
    beforeUnload.subscribe(() => {
      log('😬 user back clicked!!');
    });

    return () => {
      beforeUnload.unSubscribe();
    };
  }, []);

  function push(callback: VoidFunction) {
    dispatch(pushStack(callback));
  }

  function pop() {
    handleBackPress();
  }

  const clear = useCallback(() => {
    if (stack.length) {
      dispatch(clearStack(undefined));
    }
  }, [stack]);

  return { stack, push, pop, clear };
}

export default useBackPress;
