import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { CollectionDto } from './collection.dto';
import { SummaryCollectionDto } from './summary-collection.dto';

export class PageableCollectionsResponseDto extends createPageableResponseDto(
  CollectionDto,
) {}

export class PageableSummaryCollectionsResponseDto extends createPageableResponseDto(
  SummaryCollectionDto,
) {}
