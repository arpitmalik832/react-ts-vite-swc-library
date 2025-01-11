import { BaseQueryFn } from '@reduxjs/toolkit/query';

import useApiRequest from '../../hooks/useApiRequest';
import { BaseQueryParams } from '../types';

const baseQueryFn =
  <B extends BaseQueryParams, T>(): BaseQueryFn<B> =>
  async ({ axiosInstance, url }: B) => {
    const { makeGetCall } = useApiRequest();
    try {
      const response = await makeGetCall<T>(url, axiosInstance);
      return { data: response };
    } catch (err) {
      return { error: err };
    }
  };

export default baseQueryFn;
