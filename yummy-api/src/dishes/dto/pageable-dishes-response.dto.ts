import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { DishDto } from './dish.dto';

export class PageableDishesResponseDto extends createPageableResponseDto(
  DishDto,
) {}
