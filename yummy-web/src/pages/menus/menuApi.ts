import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { IMenu, IMenuPayload } from './List/models';

const MENU_BASE_PATH = '/menu';

const menuApi = rootApi.enhanceEndpoints({ addTagTypes: ['Menus', 'Menu'] }).injectEndpoints({
  endpoints: (build) => ({
    createMenu: build.mutation<void, IMenuPayload>({
      query: (data) => ({
        url: `${MENU_BASE_PATH}/create`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Menus'],
    }),
    getMenus: build.query<IPageableResponse<IMenu>, IPageableRequestParams>({
      query: (data) => ({
        url: `${MENU_BASE_PATH}/search`,
        method: 'POST',
        data,
      }),
      providesTags: ['Menus'],
    }),
    deleteMenu: build.mutation<void, string>({
      query: (id) => ({
        url: `${MENU_BASE_PATH}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Menus', 'Menu'],
    }),
    updateMenu: build.mutation<void, IMenuPayload & { id: string }>({
      query: ({ id, ...restData }) => ({
        url: `${MENU_BASE_PATH}/${id}`,
        method: 'PUT',
        data: restData,
      }),
      invalidatesTags: ['Menus', 'Menu'],
    }),
    getMenu: build.query<IMenu, string>({
      query: (id) => ({
        url: `${MENU_BASE_PATH}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Menu'],
    }),
  }),
});

export const {
  useCreateMenuMutation,
  useGetMenusQuery,
  useDeleteMenuMutation,
  useUpdateMenuMutation,
  useGetMenuQuery,
} = menuApi;

export default menuApi;
