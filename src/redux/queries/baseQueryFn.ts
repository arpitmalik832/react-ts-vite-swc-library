import { AxiosInstance } from 'axios';
import { BaseQueryApi, BaseQueryFn } from '@reduxjs/toolkit/query';

import useApiRequest from '../../hooks/useApiRequest';

const baseQueryFn =
  <T>(): BaseQueryFn<AxiosInstance> =>
  async (axiosInstance: AxiosInstance, baseQuery: BaseQueryApi) => {
    const { makeGetCall } = useApiRequest();
    try {
      const response = await makeGetCall<T>(baseQuery.endpoint, axiosInstance);
      return { data: response };
    } catch (err) {
      return { error: err };
    }
  };

export default baseQueryFn;
