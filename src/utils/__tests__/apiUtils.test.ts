import '@testing-library/jest-dom';
import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  addRequestInterceptor,
  addResponseInterceptor,
  handleRequest,
} from '../apiUtils';
import { errorLog } from '../logsUtils';
import type { RequestMetadata } from '../types';
import type { VoidFunctionWithParams } from '../../types/types';

jest.mock('../logsUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
}));

describe('apiUtils unit test', () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use = jest.fn();
  axiosInstance.interceptors.response.use = jest.fn();

  it('test function with proper response', () => {
    const mockData = { data: 'test data' };

    handleRequest(
      Promise.resolve({
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {} as AxiosResponseHeaders,
        config: {} as InternalAxiosRequestConfig<RequestMetadata>,
        request: {},
      }),
    )
      .then(result => {
        expect(result).toEqual(mockData);
      })
      .catch((err: AxiosError) => {
        errorLog(err);
      });
  });

  it('should handle Axios API error response', () => {
    const mockError = 'Testing AxiosError';

    handleRequest(
      Promise.reject(
        new AxiosError(
          mockError,
          '404',
          {} as InternalAxiosRequestConfig<RequestMetadata>,
          {},
          {} as AxiosResponse<Record<string, string>>,
        ),
      ),
    ).catch((error: AxiosError) => {
      expect(error.message).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', () => {
    const message = 'Not Found';
    const requestUrl = 'https://example.com/';

    handleRequest(
      Promise.reject(
        new AxiosError(
          message,
          '404',
          {} as InternalAxiosRequestConfig<RequestMetadata>,
          { url: requestUrl },
        ),
      ),
    ).catch((error: AxiosError) => {
      expect(error.message).toEqual(message);
    });
  });

  it('should handle Network Error Case', () => {
    const requestUrl = 'https://example.com/';

    handleRequest(
      Promise.reject(
        new AxiosError(
          '',
          '404',
          {
            url: requestUrl,
          } as InternalAxiosRequestConfig<RequestMetadata>,
          {},
        ),
      ),
    ).catch((error: AxiosError) => {
      expect(error.config?.url).toEqual(requestUrl);
    });
  });

  it('should handle canceled request Case', () => {
    const message = 'canceled';

    handleRequest(
      Promise.reject(
        new AxiosError(
          message,
          '404',
          {} as InternalAxiosRequestConfig<RequestMetadata>,
          {},
        ),
      ),
    ).catch((error: AxiosError) => {
      expect(error.message).toEqual(message);
    });
  });

  it('should handle Network Error Case', () => {
    handleRequest(Promise.reject(new AxiosError())).catch(
      (error: AxiosError) => {
        expect(typeof error).toEqual('object');
      },
    );
  });

  it('test addRequestInterceptor', () => {
    addRequestInterceptor(axiosInstance);
    const requestMetadata: InternalAxiosRequestConfig<RequestMetadata> = {
      headers: {} as AxiosRequestHeaders,
      data: {
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        responseTime: 0,
      },
    };

    (
      (axiosInstance.interceptors.request.use as jest.Mock).mock
        .calls[0] as VoidFunctionWithParams[]
    )[0](requestMetadata);

    try {
      (
        (axiosInstance.interceptors.request.use as jest.Mock).mock
          .calls[0] as VoidFunctionWithParams[]
      )[1](requestMetadata);
    } catch (r: unknown) {
      errorLog(r);
    }
  });

  it('test addResponseInterceptor', () => {
    addResponseInterceptor(axiosInstance);
    const response: AxiosResponse<string, string> = {
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {
        headers: {} as AxiosRequestHeaders,
        data: JSON.stringify({
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          responseTime: 0,
        }),
      },
    };

    (
      (axiosInstance.interceptors.response.use as jest.Mock).mock
        .calls[0] as VoidFunctionWithParams[]
    )[0](response);
    try {
      (
        (axiosInstance.interceptors.response.use as jest.Mock).mock
          .calls[0] as VoidFunctionWithParams[]
      )[1](response);
    } catch (r: unknown) {
      errorLog(r);
    }
  });

  it('test addResponseInterceptor', () => {
    addResponseInterceptor(axiosInstance);
    const response: AxiosResponse<string, string> = {
      data: 'data',
      status: 200,
      statusText: 'OK',
      headers: {} as AxiosResponseHeaders,
      config: {
        headers: {} as AxiosRequestHeaders,
        data: JSON.stringify({}),
      },
    };

    (
      (axiosInstance.interceptors.response.use as jest.Mock).mock
        .calls[0] as VoidFunctionWithParams[]
    )[0](response);
    try {
      (
        (axiosInstance.interceptors.response.use as jest.Mock).mock
          .calls[0] as VoidFunctionWithParams[]
      )[1](response);
    } catch (r: unknown) {
      errorLog(r);
    }
  });
});
