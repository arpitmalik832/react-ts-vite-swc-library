import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { RequestMetadata } from './types';
import { log, errorLog } from './logsUtils';

const handleRequest = async <D>(
  request: Promise<AxiosResponse<D>>,
): Promise<D> => {
  const modRequest = request
    .then(
      res => res.data, // Successful response
    )
    .catch((error: AxiosError<D>) => {
      if (error.response) {
        // Axios API Error Response
      } else if (error.message || error.config) {
        // Network Error Case
      }

      if (error.message === 'canceled') {
        // Handle cancellation gracefully
      } else if (error.response) {
        // Request was made and server responded with an error status
        // Handle different HTTP error statuses (4xx, 5xx) as needed
      } else if (error.request) {
        // Request was made but no response was received
        // Handle network-related errors
      } else {
        // Something else happened
        // Handle unexpected errors
      }
      throw error; // Rethrow the error for further handling
    });

  return modRequest;
};

const addRequestInterceptor = <T>(axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    request => {
      const newRequest: InternalAxiosRequestConfig<RequestMetadata> = {
        ...request,
        data: {
          startTime: new Date().toISOString(),
          endTime: new Date().toISOString(),
          responseTime: 0,
        },
      };
      log('Starting request -> ', newRequest);
      return newRequest;
    },
    (error: AxiosError<T, unknown>) => {
      errorLog('Request returned with error -> ', error);
      throw error;
    },
  );
};

const addResponseInterceptor = <T>(axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response: AxiosResponse<T, unknown>) => {
      const metadata = JSON.parse(
        response.config.data as string,
      ) as RequestMetadata;
      let updatedMetadata: RequestMetadata;
      if (Object.entries(metadata).length) {
        const startTime = new Date(metadata.startTime);
        const endTime = new Date();
        updatedMetadata = {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          responseTime: endTime.getTime() - startTime.getTime(),
        };
      } else {
        updatedMetadata = { startTime: '', endTime: '', responseTime: 0 };
      }
      const newResponse: AxiosResponse<T, RequestMetadata> = {
        ...response,
        config: {
          ...response.config,
          data: updatedMetadata,
        },
      };
      log('Returning response -> ', newResponse);
      return newResponse;
    },
    (error: AxiosError<T, unknown>) => {
      const metadata = JSON.parse(
        error.config!.data as string,
      ) as RequestMetadata;
      let updatedMetadata: RequestMetadata;
      if (Object.entries(metadata).length) {
        const startTime = new Date(metadata.startTime);
        const endTime = new Date();
        updatedMetadata = {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          responseTime: endTime.getTime() - startTime.getTime(),
        };
      } else {
        updatedMetadata = { startTime: '', endTime: '', responseTime: 0 };
      }
      const newError: AxiosError<T, unknown> = {
        ...error,
        config: {
          ...error.config,
          data: updatedMetadata,
        } as InternalAxiosRequestConfig<RequestMetadata>,
      };
      errorLog('Response returned with error -> ', newError);
      throw newError;
    },
  );
};

export { handleRequest, addRequestInterceptor, addResponseInterceptor };
