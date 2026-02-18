import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { CollectionDto } from './collection.dto';

export class PageableCollectionsResponseDto extends createPageableResponseDto(
  CollectionDto,
) {}
