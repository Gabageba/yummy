import rootApi from '@api/rootApi';
import type { ILoginResponse, IRegisterResponse } from './models';

const AUTH_BASE_PATH = '/auth';
const getAuthUrl = (path: string) => `${AUTH_BASE_PATH}${path}`;

const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, ILoginResponse>({
      query: (data) => ({
        url: getAuthUrl('/login'),
        method: 'POST',
        data,
      }),
    }),
    register: build.mutation<string, IRegisterResponse>({
      query: (data) => ({
        url: getAuthUrl('/register'),
        method: 'POST',
        data,
      }),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: getAuthUrl('/logout'),
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

export default authApi;
