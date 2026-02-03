import rootApi from '@api/rootApi';
import type { IMenuPayload } from './models';

const MENU_BASE_PATH = '/menu';
const getMenuUrl = (path: string) => `${MENU_BASE_PATH}${path}`;

const menuApi = rootApi.injectEndpoints({
  endpoints: (build) => ({
    createMenu: build.mutation<void, IMenuPayload>({
      query: (data) => ({
        url: getMenuUrl('/create'),
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useCreateMenuMutation } = menuApi;

export default menuApi;
