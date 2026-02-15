import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { IDish } from './models';

const DISH_BASE_PATH = '/dish';

const dishApi = rootApi.enhanceEndpoints({ addTagTypes: ['Dishes'] }).injectEndpoints({
  endpoints: (build) => ({
    getDishes: build.query<
      IPageableResponse<IDish>,
      IPageableRequestParams & { collectionId: string }
    >({
      query: ({ collectionId, ...restData }) => ({
        url: `${DISH_BASE_PATH}/${collectionId}/search`,
        method: 'POST',
        data: restData,
      }),
      providesTags: ['Dishes'],
    }),
  }),
});

export const { useGetDishesQuery } = dishApi;

export default dishApi;
