import { Type } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export interface PageableResponseDto<T> {
  results: T[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
  hasMore: boolean;
}

export function createPageableResponseDto<T>(classRef: Type<T>) {
  class PageableResponseDto {
    @ApiProperty({ example: true, description: 'Есть ли еще' })
    hasMore: boolean;

    @ApiProperty({ example: 35, description: 'Общее количество записей' })
    total: number;

    @ApiProperty({
      example: 30,
      description: 'Количество записей на странице',
      default: 30,
    })
    size: number;

    @ApiProperty({ example: 1, description: 'Текущая страница' })
    page: number;

    @ApiProperty({ example: 2, description: 'Общее количество страниц' })
    totalPages: number;

    @ApiProperty({
      type: classRef,
      isArray: true,
      example: [{ id: 1 }],
      description: 'Результат поиска',
    })
    results: T[];
  }

  return PageableResponseDto;
}
