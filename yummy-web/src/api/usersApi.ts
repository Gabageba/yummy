import rootApi from '@api/rootApi';

export interface IUserProfile {
  id: string;
  username: string;
  email: string;
}

const USERS_BASE_PATH = '/users';

const usersApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query<IUserProfile, void>({
      query: () => ({
        url: `${USERS_BASE_PATH}/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProfileQuery, useLazyGetProfileQuery } = usersApi;

export default usersApi;
