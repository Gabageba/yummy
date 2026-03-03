export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum FilterOperator {
  EQ = 'eq', // Равно
  NE = 'ne', // Не равно
  GT = 'gt', // Больше
  GTE = 'gte', // Больше или равно
  LT = 'lt', // Меньше
  LTE = 'lte', // Меньше или равно
  IN = 'in', // Входит в список
  NIN = 'nin', // Не входит в список
  REGEX = 'regex', // Совпадает с регулярным выражением
}

interface IPageableSort {
  field: string;
  order: SortOrder;
}

interface IPageableFilter {
  property: string;
  value: string;
  operator?: FilterOperator;
  asObjectId?: boolean;
}
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
  sort?: IPageableSort[];
  filters?: IPageableFilter[];
}
