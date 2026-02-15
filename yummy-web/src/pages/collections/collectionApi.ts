import rootApi from '@api/rootApi';
import type { IPageableRequestParams, IPageableResponse } from '@customTypes/pageable';
import type { ICollection, ICollectionPayload } from './List/models';

const COLLECTION_BASE_PATH = '/collection';

const collectionApi = rootApi
  .enhanceEndpoints({ addTagTypes: ['Collections', 'Collection'] })
  .injectEndpoints({
    endpoints: (build) => ({
      createCollection: build.mutation<void, ICollectionPayload>({
        query: (data) => ({
          url: `${COLLECTION_BASE_PATH}/create`,
          method: 'POST',
          data,
        }),
        invalidatesTags: ['Collections'],
      }),
      getCollections: build.query<IPageableResponse<ICollection>, IPageableRequestParams>({
        query: (data) => ({
          url: `${COLLECTION_BASE_PATH}/search`,
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
        invalidatesTags: ['Collections', 'Collection'],
      }),
      updateCollection: build.mutation<void, ICollectionPayload & { id: string }>({
        query: ({ id, ...restData }) => ({
          url: `${COLLECTION_BASE_PATH}/${id}`,
          method: 'PUT',
          data: restData,
        }),
        invalidatesTags: ['Collections', 'Collection'],
      }),
      getCollection: build.query<ICollection, string>({
        query: (id) => ({
          url: `${COLLECTION_BASE_PATH}/${id}`,
          method: 'GET',
        }),
        providesTags: ['Collection'],
      }),
    }),
  });

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useDeleteCollectionMutation,
  useUpdateCollectionMutation,
  useGetCollectionQuery,
} = collectionApi;

export default collectionApi;
