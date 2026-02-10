import rootApi from '@api/rootApi';
import type { ILoginResponse, IRegisterResponse } from './models';

const AUTH_BASE_PATH = '/auth';

const authApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<string, ILoginResponse>({
      query: (data) => ({
        url: `${AUTH_BASE_PATH}/login`,
        method: 'POST',
        data,
      }),
    }),
    register: build.mutation<string, IRegisterResponse>({
      query: (data) => ({
        url: `${AUTH_BASE_PATH}/register`,
        method: 'POST',
        data,
      }),
    }),
    logout: build.mutation<{ message: string }, void>({
      query: () => ({
        url: `${AUTH_BASE_PATH}/logout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;

export default authApi;
