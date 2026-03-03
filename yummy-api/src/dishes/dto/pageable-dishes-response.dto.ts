import { createPageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { DishDto } from './dish.dto';
import { SummaryDishDto } from './summary-dish.dto';

export class PageableDishesResponseDto extends createPageableResponseDto(
  DishDto,
) {}

export class PageableSummaryDishesResponseDto extends createPageableResponseDto(
  SummaryDishDto,
) {}
