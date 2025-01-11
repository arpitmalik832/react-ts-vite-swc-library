import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { handleRequest } from '../utils/apiUtils';

type AbortControllers = Record<string, AbortController>;

const useApiRequest = () => {
  let abortControllers: AbortControllers = {};

  const createAbortController = (key: string) => {
    if (!abortControllers[key]) {
      abortControllers[key] = new AbortController();
    }

    return abortControllers[key];
  };

  const makeGetCall = <D>(
    url: string,
    axiosInstance: AxiosInstance,
    config?: AxiosRequestConfig,
  ) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.get(url, {
        ...config,
        signal,
      }),
    );
  };

  const makePostCall = <T, D>(
    url: string,
    body: T,
    axiosInstance: AxiosInstance,
    config?: AxiosRequestConfig,
  ) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.post(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makePutCall = <T, D>(
    url: string,
    body: T,
    axiosInstance: AxiosInstance,
    config?: AxiosRequestConfig,
  ) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.put(url, body, {
        ...config,
        signal,
      }),
    );
  };

  const makeDeleteCall = <D>(
    url: string,
    axiosInstance: AxiosInstance,
    config?: AxiosRequestConfig,
  ) => {
    const abortController = createAbortController(JSON.stringify(url));

    const { signal } = abortController;

    return handleRequest<D>(
      axiosInstance.delete(url, {
        ...config,
        signal,
      }),
    );
  };

  const cancelRequest = (key: string) => {
    if (abortControllers[JSON.stringify(key)]) {
      abortControllers[JSON.stringify(key)].abort();
      delete abortControllers[JSON.stringify(key)];
    }
  };

  const cancelAllRequests = () => {
    Object.keys(abortControllers).forEach(key => {
      abortControllers[key].abort();
    });
    abortControllers = {};
  };

  return {
    makeGetCall,
    makePostCall,
    makePutCall,
    makeDeleteCall,
    cancelRequest,
    cancelAllRequests,
  };
};

export default useApiRequest;
