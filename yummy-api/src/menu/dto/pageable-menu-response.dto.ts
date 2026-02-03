import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { MenuDto } from './menu.dto';

export class PageableMenuResponseDto extends createPageableResponseDto(
  MenuDto,
) {}
