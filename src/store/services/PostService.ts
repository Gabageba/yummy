/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPost } from '@customTypes/post.ts';

export const postApi = createApi({
  reducerPath: 'postApi', // ключ опред. тек. сервис
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: '/posts',
        params: {
          _limit: limit,
        },
      }),
      providesTags: () => ['Post'], // Записываем данные
    }),
    createPost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: '/posts',
        method: 'POST',
        body: post,
      }),
      invalidatesTags: ['Post'], // Данные не актуальны
    }),
    updatePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'PUT',
        body: post,
      }),
      invalidatesTags: ['Post'], // Данные не актуальны
    }),
    deletePost: build.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'], // Данные не актуальны
    }),
  }),
});
