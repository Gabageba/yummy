import { Model, QueryFilter, Document, PopulateOptions } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';

interface pageableSearchProps<TDocument, TResult = unknown> {
  params: PageableRequestParamsDto;
  filters?: QueryFilter<TDocument>;
  queryField?: string;
  populate?: PopulateOptions | (string | PopulateOptions)[];
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

  async pageableSearch<TResult = TDto>({
    params,
    filters,
    queryField = 'name',
    populate,
    mapper,
  }: pageableSearchProps<TDocument, TResult>): Promise<
    PageableResponseDto<TResult>
  > {
    const { page, size, query, filters: paramsFilters } = params;

    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * size;

    let baseFilter: QueryFilter<TDocument> = filters ?? {};

    if (paramsFilters?.length) {
      const filtersFromParams = paramsFilters.reduce(
        (acc, { property, value }) => ({ ...acc, [property]: value }),
        {} as QueryFilter<TDocument>,
      );
      baseFilter = { ...baseFilter, ...filtersFromParams };
    }

    const filter: QueryFilter<TDocument> = query?.length
      ? withRegexQuery(baseFilter, queryField, params.query)
      : baseFilter;

    const findQuery = this.model.find(filter).skip(skip).limit(size);

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
      page,
      size,
      totalPages,
      hasMore: skip + items.length < total,
    };
  }
}
