import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import type { NavigationRedux } from '../types';
import type { VoidFunctionWithParams } from '../../types/types';
import { SLICE_NAMES } from '../../enums/redux';
import { errorLog } from '../../utils';

const navigationSlice = createSlice<
  NavigationRedux,
  SliceCaseReducers<NavigationRedux>,
  string,
  SliceSelectors<NavigationRedux>,
  string
>({
  name: SLICE_NAMES.NAVIGATION,
  initialState: {
    stack: [],
  },
  reducers: {
    pushStack: (
      state: NavigationRedux,
      action: PayloadAction<VoidFunctionWithParams>,
    ) => {
      if (!action.payload || typeof action.payload !== 'function') {
        return state;
      }
      state.stack.push(action.payload);
      return state;
    },
    popStack: (state: NavigationRedux) => {
      const top = state.stack.pop();
      if (top && typeof top === 'function') {
        try {
          top();
        } catch (error) {
          errorLog('Error executing callback:', error);
        }
      }
      return state;
    },
    clearStack: state => ({
      ...state,
      stack: [],
    }),
  },
});

export { navigationSlice };
export const { pushStack, popStack, clearStack } = navigationSlice.actions;
