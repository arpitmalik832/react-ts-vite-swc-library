import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import { THEME } from '../../enums/app';
import type { AppRedux } from '../types';
import type { AllParams, KeyValuePair } from '../../types/types';
import { SLICE_NAMES } from '../../enums/redux';

const appSlice = createSlice<
  AppRedux,
  SliceCaseReducers<AppRedux>,
  string,
  SliceSelectors<AppRedux>,
  string
>({
  name: SLICE_NAMES.APP,
  initialState: {
    theme: THEME.LIGHT,
  },
  reducers: {
    updateStore: (state, action: PayloadAction<KeyValuePair<AllParams>>) => {
      if (action?.payload?.key && action?.payload?.value) {
        return {
          ...state,
          [action.payload.key]: action.payload.value,
        };
      }
      return state;
    },
    setDarkTheme: state => ({
      ...state,
      theme: THEME.DARK,
    }),
    setLightTheme: state => ({
      ...state,
      theme: THEME.LIGHT,
    }),
  },
});

export { appSlice };
export const { updateStore, setDarkTheme, setLightTheme } = appSlice.actions;
