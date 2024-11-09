import {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { RequestMetadata } from '../types/types.d';
import { log, errorLog } from './logsUtils';

async function handleRequest<D>(
  request: Promise<AxiosResponse<D>>,
): Promise<D> {
  const modRequest = request
    .then(
      res => res.data, // Successful response
    )
    .catch(error => {
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
}

function addRequestInterceptor(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.request.use(
    request => {
      log('Starting request -> ', request.toString());
      const newRequest: InternalAxiosRequestConfig<RequestMetadata> = {
        ...request,
        data: {
          startTime: new Date(),
          endTime: new Date(),
          responseTime: 0,
        },
      };
      return newRequest;
    },
    error => {
      errorLog('Request returned with error -> ', error);
      throw error;
    },
  );
}

function addResponseInterceptor<T>(axiosInstance: AxiosInstance) {
  axiosInstance.interceptors.response.use(
    response => {
      log('Returning response -> ', response.toString());
      const newResponse: AxiosResponse<T, RequestMetadata> = {
        ...response,
        config: {
          ...response.config,
          data: {
            ...response.config.data,
            endTime: new Date(),
          },
        },
      };
      if (newResponse.config.data) {
        newResponse.config.data.responseTime =
          (newResponse.config.data.endTime.getTime() as number) -
          (newResponse.config.data.startTime.getTime() as number);
      }
      return newResponse;
    },
    error => {
      const newError = { ...error };
      newError.config.data.endTime = new Date();
      newError.config.data.responseTime =
        newError.config.data.endTime.getTime() -
        newError.config.data.startTime.getTime();
      errorLog('Response returned with error -> ', newError);
      throw newError;
    },
  );
}

export { handleRequest, addRequestInterceptor, addResponseInterceptor };
