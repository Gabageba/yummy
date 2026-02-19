import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { ICollection, ICollectionPayload, IDishCollection } from './List/models';

const COLLECTION_BASE_PATH = '/collections';

const collectionsApi = rootApi
  .enhanceEndpoints({ addTagTypes: ['Collections', 'Collection', 'DishCollections'] })
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
      getCollectionsByDishId: build.query<
        IPageableResponse<IDishCollection>,
        IPageableRequestParams & {
          dishId: string;
        }
      >({
        query: ({ dishId, ...restData }) => ({
          url: `${COLLECTION_BASE_PATH}/by-dish/${dishId}`,
          method: 'POST',
          data: restData,
        }),
        providesTags: ['DishCollections'],
      }),
    }),
  });

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useGetCollectionQuery,
} = collectionsApi;

export const { getCollectionsByDishId } = collectionsApi.endpoints;

export default collectionsApi;
