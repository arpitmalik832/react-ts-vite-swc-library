/**
 * Unit tests for baseQueryFn file.
 * @file This file is saved as `baseQueryFn.test.jsx`.
 */
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BaseQueryApi } from '@reduxjs/toolkit/query';
import { AxiosInstance } from 'axios';

import useApiRequest from '../../../hooks/useApiRequest';
import baseQueryFn from '../baseQueryFn';

// Mock the useApiRequest hook
jest.mock('../../../hooks/useApiRequest');

// Mock logsUtils
jest.mock('../../../utils/logsUtils', () => ({
  errorLog: jest.fn(),
}));

describe('baseQueryFn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should handle successful API calls', async () => {
    const mockResponse = { data: 'test data' };
    const mockMakeGetCall = jest.fn().mockResolvedValue(mockResponse);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: axiosInstance as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).resolves.toEqual({ data: mockResponse });

    expect(mockMakeGetCall).toHaveBeenCalledWith('test/url', axiosInstance);
  });

  it('should handle API call errors', async () => {
    const apiError = { message: 'API Error' };
    const mockMakeGetCall = jest.fn().mockRejectedValue(apiError);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: axiosInstance as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).resolves.toEqual({ error: apiError });
  });

  it('should handle hook initialization errors', async () => {
    const initError = new Error('Hook initialization error');
    (useApiRequest as jest.Mock).mockImplementation(() => {
      throw initError;
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: axiosInstance as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).rejects.toThrow('Hook initialization error');
  });

  it('should handle network errors', async () => {
    const networkError = { message: 'test data', code: 'ERR_NETWORK' };
    const mockMakeGetCall = jest.fn().mockRejectedValue(networkError);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: axiosInstance as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).resolves.toEqual({ error: networkError });
  });

  it('should handle malformed response', async () => {
    const mockMakeGetCall = jest.fn().mockResolvedValue(undefined);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: axiosInstance as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).resolves.toHaveProperty('data');
  });

  it('should handle axios instance errors', async () => {
    const axiosError = new Error('Axios instance error');
    const mockMakeGetCall = jest.fn().mockRejectedValue(axiosError);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const query = baseQueryFn();
    await expect(
      query(
        {
          axiosInstance: null as unknown as AxiosInstance,
          url: 'test/url',
        },
        {} as BaseQueryApi,
        {},
      ),
    ).resolves.toEqual({ error: axiosError });
  });

  // Test for promise rejection
  it('should handle promise rejection', async () => {
    const rejectionError = new Error('Promise rejected');
    const mockMakeGetCall = jest.fn().mockRejectedValue(rejectionError);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    const result = await query(
      {
        axiosInstance: axiosInstance as unknown as AxiosInstance,
        url: 'test/url',
      },
      {} as BaseQueryApi,
      {},
    );

    expect(result).toEqual({ error: rejectionError });
  });

  // Test for undefined response
  it('should handle undefined response', async () => {
    const mockMakeGetCall = jest.fn().mockResolvedValue(undefined);
    (useApiRequest as jest.Mock).mockReturnValue({
      makeGetCall: mockMakeGetCall,
    });

    const axiosInstance = {
      get: jest.fn(),
    };

    const query = baseQueryFn();
    const result = await query(
      {
        axiosInstance: axiosInstance as unknown as AxiosInstance,
        url: 'test/url',
      },
      {} as BaseQueryApi,
      {},
    );

    expect(result).toEqual({ data: undefined });
  });
});
