import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { DishDto } from './dish.dto';

export class PageableDishResponseDto extends createPageableResponseDto(
  DishDto,
) {}
