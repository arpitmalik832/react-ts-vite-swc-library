import '@testing-library/jest-dom';
import axios, { AxiosResponse } from 'axios';

import {
  addRequestInterceptor,
  addResponseInterceptor,
  handleRequest,
} from '../apiUtils';
import { log } from '../logsUtils';

jest.mock('../commonUtils', () => ({
  __esModule: true,
  log: jest.fn(),
  errorLog: jest.fn(),
}));

describe('apiUtils unit test', () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.request.use = jest.fn();
  axiosInstance.interceptors.response.use = jest.fn();

  it('test function with proper response', async () => {
    const mockData = { data: 'test data' };

    const request = Promise.resolve({ data: mockData });
    const result = await handleRequest(request as Promise<AxiosResponse>);

    expect(result).toEqual(mockData);
  });

  it('should handle Axios API error response', async () => {
    const mockError = {
      response: {
        status: 404,
        data: 'Not Found',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {
      message: 'Not Found',
      request: {
        url: 'https://example.com/',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {
      config: {
        mock: 'Not Found',
      },
    };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle canceled request Case', async () => {
    const mockError = { message: 'canceled' };

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('should handle Network Error Case', async () => {
    const mockError = {};

    const request = Promise.reject(mockError);
    await handleRequest(request).catch(error => {
      expect(error).toEqual(mockError);
    });
  });

  it('test addRequestInterceptor', () => {
    addRequestInterceptor(axiosInstance);

    (axiosInstance.interceptors.request.use as jest.Mock).mock.calls[0][0]({
      data: {
        startTime: new Date(),
      },
    });
    try {
      (axiosInstance.interceptors.request.use as jest.Mock).mock.calls[0][1]({
        data: {
          startTime: new Date(),
        },
      });
    } catch (r) {
      log(r);
    }
  });

  it('test addResponseInterceptor', () => {
    addResponseInterceptor(axiosInstance);

    (axiosInstance.interceptors.response.use as jest.Mock).mock.calls[0][0]({
      config: {
        data: {
          startTime: new Date(),
        },
      },
    });
    try {
      (axiosInstance.interceptors.response.use as jest.Mock).mock.calls[0][1]({
        config: {
          data: {
            startTime: new Date(),
          },
        },
      });
    } catch (r) {
      log(r);
    }
  });
});
