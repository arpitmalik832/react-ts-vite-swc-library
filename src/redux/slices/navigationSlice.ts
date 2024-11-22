import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import { NavigationRedux, VoidFunction } from '../../types/types.d';

const navigationSlice = createSlice<
  NavigationRedux,
  SliceCaseReducers<NavigationRedux>,
  string,
  SliceSelectors<NavigationRedux>,
  string
>({
  name: 'navigation',
  initialState: {
    stack: [],
  },
  reducers: {
    pushStack: (
      state: NavigationRedux,
      action: PayloadAction<VoidFunction>,
    ) => {
      state.stack.push(action.payload);
      return state;
    },
    popStack: (state: NavigationRedux) => {
      const top = state.stack.pop();
      if (top) {
        top();
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
