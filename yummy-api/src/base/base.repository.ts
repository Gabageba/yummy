import { Model, FilterQuery, Document } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';

export abstract class BaseRepository<TDocument extends Document, TDto> {
  constructor(protected readonly model: Model<TDocument>) {}

  protected abstract toDto(document: TDocument): TDto;

  async pageableSearch(
    params: PageableRequestParamsDto,
    filters?: FilterQuery<TDocument>,
    queryField: string = 'name',
  ): Promise<PageableResponseDto<TDto>> {
    const { page, size, query } = params;

    const currentPage = Math.max(1, page);
    const skip = (currentPage - 1) * size;

    const filter = filters || {};

    if (query?.length) {
      filter[queryField] = { $regex: params.query, $options: 'i' };
    }

    const [items, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(size).exec(),
      this.model.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / size);

    return {
      results: items.map((item) => this.toDto(item)),
      total,
      page,
      size,
      totalPages,
      hasMore: skip + items.length < total,
    };
  }
}
