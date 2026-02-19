import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { IDish, IDishPayload } from './models';

const DISH_BASE_PATH = '/dishes';

const dishesApi = rootApi
  .enhanceEndpoints({ addTagTypes: ['Dishes', 'DishCollections'] })
  .injectEndpoints({
    endpoints: (build) => ({
      createDish: build.mutation<string, IDishPayload>({
        query: (data) => ({
          url: `${DISH_BASE_PATH}`,
          method: 'POST',
          data,
        }),
        invalidatesTags: ['Dishes'],
      }),
      getDishes: build.query<
        IPageableResponse<IDish>,
        IPageableRequestParams & { collectionId: string }
      >({
        query: ({ collectionId, ...restData }) => ({
          url: `${DISH_BASE_PATH}/list`,
          method: 'POST',
          data: restData,
        }),
        providesTags: ['Dishes'],
      }),
      deleteDish: build.mutation<void, string>({
        query: (id) => ({
          url: `${DISH_BASE_PATH}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Dishes'],
      }),
      updateDish: build.mutation<void, IDishPayload & { id: string }>({
        query: ({ id, ...restData }) => ({
          url: `${DISH_BASE_PATH}/${id}`,
          method: 'PUT',
          data: restData,
        }),
        invalidatesTags: ['Dishes'],
      }),
      updateDishCollections: build.mutation<void, { id: string; collections: string[] }>({
        query: ({ id, collections }) => ({
          url: `${DISH_BASE_PATH}/${id}/collections`,
          method: 'PUT',
          data: collections,
        }),
        invalidatesTags: ['DishCollections'],
      }),
    }),
  });

export const {
  useGetDishesQuery,
  useCreateDishMutation,
  useDeleteDishMutation,
  useUpdateDishMutation,
  useUpdateDishCollectionsMutation,
} = dishesApi;

export default dishesApi;
