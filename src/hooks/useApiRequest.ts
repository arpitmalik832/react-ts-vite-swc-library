import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { handleRequest } from '../utils/apiUtils';
import { AbortControllers } from '../types/types.d';

function useApiRequest() {
  let abortControllers: AbortControllers = {};

  function createAbortController(key: string) {
    if (!abortControllers[key]) {
      abortControllers[key] = new AbortController();
    }

    return abortControllers[key];
  }

  function makeGetCall<D>(
    url: string,
    axiosInstance?: AxiosInstance,
    config?: AxiosRequestConfig,
  ) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    if (axiosInstance) {
      return handleRequest<D>(
        axiosInstance.get(url, {
          ...config,
          signal,
        }),
      );
    }

    return new Error('Axios instance not provided');
  }

  function makePostCall<T, D>(
    url: string,
    body: T,
    axiosInstance?: AxiosInstance,
    config?: AxiosRequestConfig,
  ) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    if (axiosInstance) {
      return handleRequest<D>(
        axiosInstance.post(url, body, {
          ...config,
          signal,
        }),
      );
    }

    return new Error('Axios instance not provided');
  }

  function makePutCall<T, D>(
    url: string,
    body: T,
    axiosInstance?: AxiosInstance,
    config?: AxiosRequestConfig,
  ) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    if (axiosInstance) {
      return handleRequest<D>(
        axiosInstance.put(url, body, {
          ...config,
          signal,
        }),
      );
    }

    return new Error('Axios instance not provided');
  }

  function makeDeleteCall<D>(
    url: string,
    axiosInstance?: AxiosInstance,
    config?: AxiosRequestConfig,
  ) {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    if (axiosInstance) {
      return handleRequest<D>(
        axiosInstance.delete(url, {
          ...config,
          signal,
        }),
      );
    }

    return new Error('Axios instance not provided');
  }

  function cancelRequest(key: string) {
    if (abortControllers[JSON.stringify(key)]) {
      abortControllers[JSON.stringify(key)].abort();
      delete abortControllers[JSON.stringify(key)];
    }
  }

  function cancelAllRequests() {
    Object.keys(abortControllers).forEach(key => {
      abortControllers[key].abort();
    });
    abortControllers = {};
  }

  return {
    makeGetCall,
    makePostCall,
    makePutCall,
    makeDeleteCall,
    cancelRequest,
    cancelAllRequests,
  };
}

export default useApiRequest;
