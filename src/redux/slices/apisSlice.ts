import {
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  SliceSelectors,
} from '@reduxjs/toolkit';

import {
  AddToApiHeadersByHost,
  AddToApiHeadersByIndex,
  APIData,
  ApisRedux,
  UpdateApiAxiosInstanceByHost,
  UpdateApiAxiosInstanceByIndex,
  UpdateApiHeadersByHost,
  UpdateApiHeadersByIndex,
  UpdateApiHostByIndex,
  UpdateApiHostByValue,
} from '../types';
import { SLICE_NAMES } from '../../enums/redux';

const apisSlice = createSlice<
  ApisRedux,
  SliceCaseReducers<ApisRedux>,
  string,
  SliceSelectors<ApisRedux>,
  string
>({
  name: SLICE_NAMES.APIS,
  initialState: [],
  reducers: {
    addNewApiData: (state, action: PayloadAction<APIData>) => [
      ...state,
      action.payload,
    ],
    updateApiHostByValue: (
      state,
      action: PayloadAction<UpdateApiHostByValue>,
    ) => {
      const newState = state;
      const oldApi = action.payload.oldValue;

      const item = newState.find(i => i.host === oldApi);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            host: action.payload.newValue,
          };
        }
      }
      return newState;
    },
    updateApiHostByIndex: (
      state,
      action: PayloadAction<UpdateApiHostByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...newState[index],
          host: action.payload.newValue,
        };
      }
      return newState;
    },
    updateApiHeadersByHost: (
      state,
      action: PayloadAction<UpdateApiHeadersByHost>,
    ) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            headers: action.payload.newHeaders,
          };
        }
      }
      return newState;
    },
    updateApiHeadersByIndex: (
      state,
      action: PayloadAction<UpdateApiHeadersByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...state[index],
          headers: action.payload.newHeaders,
        };
      }
      return newState;
    },
    addToApiHeadersByHost: (
      state,
      action: PayloadAction<AddToApiHeadersByHost>,
    ) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            headers: {
              ...item.headers,
              [action.payload.newHeader.key]: action.payload.newHeader.value,
            },
          };
        }
      }
      return state;
    },
    addToApiHeadersByIndex: (
      state,
      action: PayloadAction<AddToApiHeadersByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= state.length) {
        newState[index] = {
          ...newState[index],
          headers: {
            ...newState[index].headers,
            [action.payload.newHeader.key]: action.payload.newHeader.value,
          },
        };
      }
      return state;
    },
    updateApiAxiosInstanceByHost: (
      state,
      action: PayloadAction<UpdateApiAxiosInstanceByHost>,
    ) => {
      const newState = state;
      const { host } = action.payload;

      const item = newState.find(i => i.host === host);
      if (item) {
        const index = newState.indexOf(item);
        if (index !== -1) {
          newState[index] = {
            ...item,
            axiosInstance: action.payload.axiosInstance,
          };
        }
      }
      return newState;
    },
    updateApiAxiosInstanceByIndex: (
      state,
      action: PayloadAction<UpdateApiAxiosInstanceByIndex>,
    ) => {
      const newState = state;
      const { index } = action.payload;

      if (index <= newState.length) {
        newState[index] = {
          ...newState[index],
          axiosInstance: action.payload.axiosInstance,
        };
      }
      return newState;
    },
  },
});

export { apisSlice };
export const {
  addNewApiData,
  updateApiHostByValue,
  updateApiHostByIndex,
  updateApiHeadersByHost,
  updateApiHeadersByIndex,
  addToApiHeadersByHost,
  addToApiHeadersByIndex,
  updateApiAxiosInstanceByHost,
  updateApiAxiosInstanceByIndex,
} = apisSlice.actions;
