import rootApi from '@api/rootApi';
import type { ILoginResponse, IRegisterResponse } from './models';

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<void, ILoginResponse>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
    }),
    register: build.mutation<void, IRegisterResponse>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export default authApi;
