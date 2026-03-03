import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SortItemDto {
  @ApiProperty({ example: 'name', description: 'Поле для сортировки' })
  @IsString()
  field: string;

  @ApiProperty({
    example: 'asc',
    description: 'Направление: asc или desc',
    enum: ['asc', 'desc'],
  })
  @IsString()
  order: 'asc' | 'desc';
}

export enum FilterOperator {
  EQ = 'eq', //Равно
  NE = 'ne', //Не равно
  GT = 'gt', //Больше
  GTE = 'gte', //Больше или равно
  LT = 'lt', //Меньше
  LTE = 'lte', //Меньше или равно
  IN = 'in', //Входит в список
  NIN = 'nin', //Не входит в список
  REGEX = 'regex', //Совпадает с регулярным выражением
}

export class FilterItemDto {
  @ApiProperty({
    example: 'difficulty',
    description: 'Имя свойства для фильтрации',
  })
  @IsString()
  property: string;

  @ApiProperty({
    example: 'easy',
    description: 'Значение фильтра (строка; для in/nin — через запятую)',
  })
  @IsString()
  value: string;

  @ApiPropertyOptional({
    example: FilterOperator.EQ,
    description: 'Оператор сравнения',
    enum: FilterOperator,
    default: FilterOperator.EQ,
  })
  @IsOptional()
  @IsEnum(FilterOperator)
  operator?: FilterOperator = FilterOperator.EQ;

  @ApiPropertyOptional({
    example: false,
    description:
      'Привести значение к ObjectId (для полей-ссылок и массивов ObjectId)',
  })
  @IsOptional()
  @IsBoolean()
  asObjectId?: boolean;
}

export class PageableRequestParamsDto {
  @ApiProperty({
    example: 1,
    description: 'Номер страницы',
    required: true,
  })
  @IsDefined()
  @IsNumber()
  page: number;

  @ApiProperty({
    example: 30,
    description: 'Количество объектов на странице',
    default: 30,
  })
  @IsOptional()
  @IsNumber()
  size: number = 30;

  @ApiProperty({
    example: 'string',
    description: 'Поисковая фраза',
  })
  @IsOptional()
  @IsString()
  query: string;

  @ApiPropertyOptional({
    description:
      'Фильтры: свойство, значение и оператор (eq, ne, gt, gte, lt, lte, in, nin, regex)',
    type: [FilterItemDto],
    example: [
      { property: 'difficulty', value: 'easy', operator: 'eq' },
      { property: 'tags', value: 'italian' },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterItemDto)
  filters?: FilterItemDto[];

  @ApiPropertyOptional({
    description: 'Сортировка: поле и направление',
    type: [SortItemDto],
    example: [{ field: 'name', order: 'asc' }],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SortItemDto)
  sort?: SortItemDto[];
}
