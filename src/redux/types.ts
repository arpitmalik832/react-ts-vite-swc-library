import type { AxiosInstance } from 'axios';

import type { KeyValuePair, VoidFunctionWithParams } from '../types/types';

export interface AppRedux {
  theme: string;
}

export interface APIData {
  host: string;
  headers: Record<string, string>;
  axiosInstance: AxiosInstance;
}

export interface UpdateApiHostByValue {
  oldValue: string;
  newValue: string;
}

export interface UpdateApiHostByIndex {
  index: number;
  newValue: string;
}

export interface UpdateApiHeadersByHost {
  host: string;
  newHeaders: Record<string, string>;
}

export interface UpdateApiHeadersByIndex {
  index: number;
  newHeaders: Record<string, string>;
}

export interface AddToApiHeadersByHost {
  host: string;
  newHeader: KeyValuePair;
}

export interface AddToApiHeadersByIndex {
  index: number;
  newHeader: KeyValuePair;
}

export interface UpdateApiAxiosInstanceByHost {
  host: string;
  axiosInstance: AxiosInstance;
}

export interface UpdateApiAxiosInstanceByIndex {
  index: number;
  axiosInstance: AxiosInstance;
}

export type ApisRedux = APIData[];

export interface NavigationRedux {
  stack: VoidFunctionWithParams[];
}

export interface ReduxState {
  app: AppRedux;
  apis: ApisRedux;
  navigation: NavigationRedux;
}

export interface BaseQueryParams {
  axiosInstance: AxiosInstance;
  url: string;
}
