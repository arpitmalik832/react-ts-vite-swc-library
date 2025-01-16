import { renderHook } from '@testing-library/react';
import { AxiosInstance } from 'axios';

import useApiRequest from '../useApiRequest';

jest.mock('../../utils/apiUtils', () => ({
  __esModule: true,
  handleRequest: jest.fn((e: Promise<object>) => e),
}));

describe('useApiRequest', () => {
  type Body = object;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET request', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      get: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'get');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makeGetCall<Body>(
        '/posts/1',
        axiosInstance as unknown as AxiosInstance,
      );
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });

  test('POST request', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      post: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'post');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makePostCall<Body, Body>(
        '/posts',
        {},
        axiosInstance as unknown as AxiosInstance,
      );
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });

  test('PUT request', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      put: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'put');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makePutCall<Body, Body>(
        '/posts/1',
        {},
        axiosInstance as unknown as AxiosInstance,
      );
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });

  test('DELETE request', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      delete: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'delete');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makeDeleteCall<Body>(
        '/posts/1',
        axiosInstance as unknown as AxiosInstance,
      );
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });

  test('request cancellation', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      get: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'get');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makeGetCall<Body>(
        '/posts/1',
        axiosInstance as unknown as AxiosInstance,
      );
      result.current.cancelRequest('GET /posts/1');
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });

  test('cancel all requests', async () => {
    const respBody = {
      userId: 1,
      id: 1,
      title:
        'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
      body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
    };
    const axiosInstance = {
      get: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
      post: jest.fn().mockImplementation(() => Promise.resolve(respBody)),
    };
    const spy = jest.spyOn(axiosInstance, 'get');
    const spy2 = jest.spyOn(axiosInstance, 'post');

    const { result } = renderHook(() => useApiRequest());

    try {
      const resp = await result.current.makeGetCall<Body>(
        '/posts/1',
        axiosInstance as unknown as AxiosInstance,
      );
      expect(spy).toHaveBeenCalled();
      expect(resp).toBe(respBody);
      const resp2 = await result.current.makePostCall<Body, Body>(
        '/posts',
        {},
        axiosInstance as unknown as AxiosInstance,
      );
      result.current.cancelAllRequests();
      expect(spy2).toHaveBeenCalled();
      expect(resp2).toBe(respBody);
    } catch (err: unknown) {
      expect((err as Error).message).toBe('Network Error');
    }
  });
});
