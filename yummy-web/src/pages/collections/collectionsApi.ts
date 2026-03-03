import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { IDish } from '@pages/dishes/models';
import type { ICollection, ICollectionPayload } from './List/models';

const COLLECTION_BASE_PATH = '/collections';

const collectionsApi = rootApi
  .enhanceEndpoints({
    addTagTypes: ['Collections', 'Collection', 'DishCollections', 'CollectionDishes', 'Dishes'],
  })
  .injectEndpoints({
    endpoints: (build) => ({
      createCollection: build.mutation<void, ICollectionPayload>({
        query: (data) => ({
          url: `${COLLECTION_BASE_PATH}`,
          method: 'POST',
          data,
        }),
        invalidatesTags: ['Collections'],
      }),
      getCollections: build.query<IPageableResponse<ICollection>, IPageableRequestParams>({
        query: (data) => ({
          url: `${COLLECTION_BASE_PATH}/list`,
          method: 'POST',
          data,
        }),
        providesTags: ['Collections'],
      }),
      deleteCollection: build.mutation<void, string>({
        query: (id) => ({
          url: `${COLLECTION_BASE_PATH}/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Collections', 'Collection', 'DishCollections'],
      }),
      updateCollection: build.mutation<void, ICollectionPayload & { id: string }>({
        query: ({ id, ...restData }) => ({
          url: `${COLLECTION_BASE_PATH}/${id}`,
          method: 'PUT',
          data: restData,
        }),
        invalidatesTags: ['Collections', 'Collection', 'DishCollections'],
      }),
      getCollection: build.query<ICollection, string>({
        query: (id) => ({
          url: `${COLLECTION_BASE_PATH}/${id}`,
          method: 'GET',
        }),
        providesTags: ['Collection'],
      }),
      getCollectionDishes: build.query<
        IPageableResponse<IDish>,
        IPageableRequestParams & {
          collectionId: string;
        }
      >({
        query: ({ collectionId, ...restData }) => ({
          url: `${COLLECTION_BASE_PATH}/${collectionId}/dishes`,
          method: 'POST',
          data: restData,
        }),
        providesTags: ['CollectionDishes'],
      }),
      removeDishFromCollection: build.mutation<void, { collectionId: string; dishId: string }>({
        query: ({ collectionId, dishId }) => ({
          url: `${COLLECTION_BASE_PATH}/${collectionId}/dishes/${dishId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['CollectionDishes', 'DishCollections', 'Dishes'],
      }),
    }),
  });

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useGetCollectionQuery,
  useGetCollectionDishesQuery,
  useRemoveDishFromCollectionMutation,
} = collectionsApi;

export default collectionsApi;
