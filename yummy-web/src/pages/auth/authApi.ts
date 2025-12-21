import rootApi from '@api/rootApi';
import type { ILoginResponse, IRegisterResponse } from './models';

export const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, ILoginResponse>({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        data,
      }),
    }),
    register: build.mutation<string, IRegisterResponse>({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        data,
      }),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

export default authApi;
