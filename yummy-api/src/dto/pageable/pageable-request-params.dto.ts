import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FilterItemDto {
  @ApiProperty({
    example: 'difficulty',
    description: 'Имя свойства для фильтрации',
  })
  @IsString()
  property: string;

  @ApiProperty({
    example: 'easy',
    description: 'Значение фильтра (строка, число или boolean)',
  })
  @IsString()
  value: string;
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
    description: 'Фильтры: массив пар свойство — значение',
    type: [FilterItemDto],
    example: [
      { property: 'difficulty', value: 'easy' },
      { property: 'tags', value: 'italian' },
    ],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FilterItemDto)
  filters?: FilterItemDto[];
}
