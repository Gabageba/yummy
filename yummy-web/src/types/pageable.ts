export interface IPageableResponse<T> {
  results: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  hasMore: boolean;
}

export interface IPageableRequestParams {
  page: number;
  size?: number;
  query?: string;
}
