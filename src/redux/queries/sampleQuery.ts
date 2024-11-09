import { createApi } from '@reduxjs/toolkit/query/react';
import { AxiosInstance } from 'axios';

import baseQueryFn from './baseQueryFn';

const sampleQuery = createApi({
  reducerPath: 'sampleQuery',
  baseQuery: baseQueryFn(),
  tagTypes: ['Jokes'],
  endpoints: builder => ({
    fetchData: builder.query({
      query: (axiosInstance: AxiosInstance) => ({
        axiosInstance,
        url: '/jokes',
      }),
      providesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
    updateData: builder.mutation({
      query: (axiosInstance: AxiosInstance) => ({
        axiosInstance,
        url: '/jokes/update',
      }),
      invalidatesTags: [{ type: 'Jokes', id: 'LIST' }],
    }),
  }),
});

export { sampleQuery };
export const { useFetchDataQuery, useUpdateDataMutation } = sampleQuery;
