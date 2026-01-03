import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import api from '@api/axios';

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
      data?: unknown;
      params?: Record<string, unknown>;
      skipErrors?: number[];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, skipErrors }) => {
    try {
      const result = await api({
        url,
        method,
        data,
        params,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as {
        response?: { status?: number; data?: unknown };
        message?: string;
      };
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
          skipErrors,
        },
      };
    }
  };

export default axiosBaseQuery;
