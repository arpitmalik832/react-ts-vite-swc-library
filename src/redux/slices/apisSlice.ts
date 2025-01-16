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
      const { oldValue, newValue } = action.payload;

      const index = newState.findIndex(i => i.host === oldValue);

      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          host: newValue,
        };
      }
      return newState;
    },
    updateApiHostByIndex: (
      state,
      action: PayloadAction<UpdateApiHostByIndex>,
    ) => {
      const newState = state;
      const { index, newValue } = action.payload;

      if (index <= newState.length && index >= 0) {
        newState[index] = {
          ...newState[index],
          host: newValue,
        };
      }
      return newState;
    },
    updateApiHeadersByHost: (
      state,
      action: PayloadAction<UpdateApiHeadersByHost>,
    ) => {
      const newState = state;
      const { host, newHeaders } = action.payload;

      const index = newState.findIndex(i => i.host === host);
      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          headers: newHeaders,
        };
      }
      return newState;
    },
    updateApiHeadersByIndex: (
      state,
      action: PayloadAction<UpdateApiHeadersByIndex>,
    ) => {
      const newState = state;
      const { index, newHeaders } = action.payload;

      if (index <= newState.length && index >= 0) {
        newState[index] = {
          ...newState[index],
          headers: newHeaders,
        };
      }
      return newState;
    },
    addToApiHeadersByHost: (
      state,
      action: PayloadAction<AddToApiHeadersByHost>,
    ) => {
      const newState = state;
      const { host, newHeader } = action.payload;

      const index = newState.findIndex(i => i.host === host);
      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          headers: {
            ...newState[index].headers,
            [newHeader.key]: newHeader.value,
          },
        };
      }
      return state;
    },
    addToApiHeadersByIndex: (
      state,
      action: PayloadAction<AddToApiHeadersByIndex>,
    ) => {
      const newState = state;
      const { index, newHeader } = action.payload;

      if (index <= newState.length && index >= 0) {
        newState[index] = {
          ...newState[index],
          headers: {
            ...newState[index].headers,
            [newHeader.key]: newHeader.value,
          },
        };
      }
      return newState;
    },
    updateApiAxiosInstanceByHost: (
      state,
      action: PayloadAction<UpdateApiAxiosInstanceByHost>,
    ) => {
      const newState = state;
      const { host, axiosInstance } = action.payload;

      const index = newState.findIndex(i => i.host === host);
      if (index !== -1) {
        newState[index] = {
          ...newState[index],
          axiosInstance,
        };
      }
      return newState;
    },
    updateApiAxiosInstanceByIndex: (
      state,
      action: PayloadAction<UpdateApiAxiosInstanceByIndex>,
    ) => {
      const newState = state;
      const { index, axiosInstance } = action.payload;

      if (index <= newState.length && index >= 0) {
        newState[index] = {
          ...newState[index],
          axiosInstance,
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
