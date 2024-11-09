import {
  createSlice,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import { ApisRedux } from '../../types/types.d';

const apisSlice = createSlice<
  ApisRedux,
  SliceCaseReducers<ApisRedux>,
  string,
  SliceSelectors<ApisRedux>,
  string
>({
  name: 'apis',
  initialState: {
    api1Host: 'no-url',
    api1Headers: {},
    api1AxiosInstance: undefined,
  },
  reducers: {
    updateApi1Host: (state, action) => ({
      ...state,
      api1Host: action.payload,
    }),
    updateApi1Headers: (state, action) => ({
      ...state,
      api1Headers: action.payload,
    }),
    addToApi1Headers: (state, action) => {
      Object.assign(state.api1Headers, {
        [action.payload.key]: action.payload.value,
      });
      return state;
    },
    updateApi1AxiosInstance: (state, action) => ({
      ...state,
      api1AxiosInstance: action.payload,
    }),
  },
});

export { apisSlice };
export const {
  updateApi1Host,
  updateApi1Headers,
  addToApi1Headers,
  updateApi1AxiosInstance,
} = apisSlice.actions;
