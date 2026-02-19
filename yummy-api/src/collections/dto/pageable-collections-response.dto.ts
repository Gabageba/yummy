import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { CollectionDto } from './collection.dto';
import { SummaryCollectionDto } from './summary-collection.dto';
import { SummaryCollectionWithCheckedDto } from './summary-collection-with-checked.dto';

export class PageableCollectionsResponseDto extends createPageableResponseDto(
  CollectionDto,
) {}

export class PageableSummaryCollectionsResponseDto extends createPageableResponseDto(
  SummaryCollectionDto,
) {}

export class PageableSummaryCollectionsWithCheckedResponseDto extends createPageableResponseDto(
  SummaryCollectionWithCheckedDto,
) {}
