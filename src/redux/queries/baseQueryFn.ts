import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError } from 'axios';

import useApiRequest from '../../hooks/useApiRequest';
import { BaseQueryParams } from '../types';

const baseQueryFn =
  <B extends BaseQueryParams, T>(): BaseQueryFn<B> =>
  async ({ axiosInstance, url }: B) => {
    const { makeGetCall } = useApiRequest();

    return makeGetCall<T>(url, axiosInstance)
      .then(response => ({ data: response }))
      .catch((err: AxiosError<T>) => ({ error: err }));
  };

export default baseQueryFn;
