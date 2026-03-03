import {
  Model,
  QueryFilter,
  Document,
  PopulateOptions,
  PipelineStage,
  Types,
} from 'mongoose';
import {
  PageableRequestParamsDto,
  FilterItemDto,
  FilterOperator,
} from 'src/dto/pageable/pageable-request-params.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';

function parseFilterValue(
  value: string,
  asObjectId?: boolean,
): string | number | boolean | Types.ObjectId {
  if (asObjectId) {
    return new Types.ObjectId(value);
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  const num = Number(value);
  if (value !== '' && !Number.isNaN(num)) return num;
  return value;
}

function buildFilterFromItem<T>(item: FilterItemDto): QueryFilter<T> {
  const {
    property,
    value,
    operator = FilterOperator.EQ,
    asObjectId = false,
  } = item;
  const parsed = parseFilterValue(value, asObjectId);

  switch (operator) {
    case FilterOperator.EQ:
      return { [property]: parsed } as QueryFilter<T>;
    case FilterOperator.NE:
      return { [property]: { $ne: parsed } } as QueryFilter<T>;
    case FilterOperator.GT:
      return { [property]: { $gt: parsed } } as QueryFilter<T>;
    case FilterOperator.GTE:
      return { [property]: { $gte: parsed } } as QueryFilter<T>;
    case FilterOperator.LT:
      return { [property]: { $lt: parsed } } as QueryFilter<T>;
    case FilterOperator.LTE:
      return { [property]: { $lte: parsed } } as QueryFilter<T>;
    case FilterOperator.IN:
      return {
        [property]: {
          $in: value
            .split(',')
            .map((v) => parseFilterValue(v.trim(), asObjectId)),
        },
      } as QueryFilter<T>;
    case FilterOperator.NIN:
      return {
        [property]: {
          $nin: value
            .split(',')
            .map((v) => parseFilterValue(v.trim(), asObjectId)),
        },
      } as QueryFilter<T>;
    case FilterOperator.REGEX:
      return {
        [property]: { $regex: value, $options: 'i' },
      } as QueryFilter<T>;
    default:
      return { [property]: parsed } as QueryFilter<T>;
  }
}

interface pageableSearchProps<TDocument, TResult = unknown> {
  params: PageableRequestParamsDto;
  filters?: QueryFilter<TDocument>;
  queryField?: string;
  populate?: PopulateOptions | (string | PopulateOptions)[];
  sort?: Record<string, 1 | -1>;
  mapper: (document: TDocument) => TResult;
}

function withRegexQuery<T>(
  base: QueryFilter<T>,
  queryField: string,
  query: string,
): QueryFilter<T> {
  return {
    ...base,
    [queryField]: { $regex: query, $options: 'i' },
  } as QueryFilter<T>;
}

export abstract class BaseRepository<TDocument extends Document, TDto> {
  constructor(protected readonly model: Model<TDocument>) {}

  protected buildSortFromParams(params: {
    sort?: Array<{ field: string; order: 'asc' | 'desc' }>;
  }): Record<string, 1 | -1> | undefined {
    const sortParams = params.sort;
    if (!Array.isArray(sortParams) || sortParams.length === 0) return undefined;
    return sortParams.reduce<Record<string, 1 | -1>>(
      (acc, { field, order }) => ({
        ...acc,
        [field]: order === 'asc' ? 1 : -1,
      }),
      {},
    );
  }

  async pageableSearch<TResult = TDto>({
    params,
    filters,
    queryField = 'name',
    populate,
    sort: sortOverride,
    mapper,
  }: pageableSearchProps<TDocument, TResult>): Promise<
    PageableResponseDto<TResult>
  > {
    const { page, size, query, filters: paramsFilters } = params;

    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * size;

    let baseFilter: QueryFilter<TDocument> = filters ?? {};

    if (paramsFilters?.length) {
      const filtersFromParams = paramsFilters.reduce<QueryFilter<TDocument>>(
        (acc, item) => ({ ...acc, ...buildFilterFromItem<TDocument>(item) }),
        {},
      );
      baseFilter = { ...baseFilter, ...filtersFromParams };
    }

    const filter: QueryFilter<TDocument> = query?.length
      ? withRegexQuery(baseFilter, queryField, params.query)
      : baseFilter;

    const findQuery = this.model.find(filter).skip(skip).limit(size);

    const sort = sortOverride ?? this.buildSortFromParams(params);
    if (sort && Object.keys(sort).length > 0) {
      findQuery.sort(sort);
    }

    if (populate) {
      findQuery.populate(populate);
    }

    const [items, total] = await Promise.all([
      findQuery.exec() as Promise<TDocument[]>,
      this.model.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / size);

    const results = items.map((item) => mapper(item));

    return {
      results,
      total,
      page: currentPage,
      size,
      totalPages,
      hasMore: skip + items.length < total,
    };
  }

  async pageableAggregation<TResult>(
    params: PageableRequestParamsDto,
    pipelineStages: PipelineStage[],
    mapper: (doc: Record<string, unknown>) => TResult,
  ): Promise<PageableResponseDto<TResult>> {
    const page = Math.max(1, params.page ?? 1);
    const size = params.size ?? 30;
    const skip = (page - 1) * size;

    const pipeline: PipelineStage[] = [
      ...pipelineStages,
      {
        $facet: {
          items: [{ $skip: skip }, { $limit: size }],
          total: [{ $count: 'count' }],
        },
      },
    ];

    const [result] = await this.model
      .aggregate<{
        items: Record<string, unknown>[];
        total: { count: number }[];
      }>(pipeline)
      .exec();
    const items = result?.items ?? [];
    const total = result?.total?.[0]?.count ?? 0;
    const totalPages = Math.ceil(total / size);

    return {
      results: items.map((item) => mapper(item)),
      total,
      page,
      size,
      totalPages,
      hasMore: skip + items.length < total,
    };
  }
}
