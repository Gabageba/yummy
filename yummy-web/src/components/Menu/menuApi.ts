import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { IMenu, IMenuPayload } from './models';

const MENU_BASE_PATH = '/menu';
const getMenuUrl = (path: string) => `${MENU_BASE_PATH}${path}`;

const menuApi = rootApi.enhanceEndpoints({ addTagTypes: ['Menus'] }).injectEndpoints({
  endpoints: (build) => ({
    createMenu: build.mutation<void, IMenuPayload>({
      query: (data) => ({
        url: getMenuUrl('/create'),
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Menus'],
    }),
    getMenus: build.query<IPageableResponse<IMenu>, IPageableRequestParams>({
      query: (data) => ({
        url: getMenuUrl('/search'),
        method: 'POST',
        data,
      }),
      providesTags: ['Menus'],
    }),
  }),
});

export const { useCreateMenuMutation, useGetMenusQuery } = menuApi;

export default menuApi;
