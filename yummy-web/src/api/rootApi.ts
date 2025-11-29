import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '@api/axiosBaseQuery';

const rootApi = createApi({
  baseQuery: axiosBaseQuery(),
  endpoints: () => ({}),
});

export default rootApi;
