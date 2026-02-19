import { ApiProperty } from '@nestjs/swagger';

export class SummaryCollectionDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Уникальный идентификатор подборки',
  })
  id: string;

  @ApiProperty({
    example: 'Название',
    description: 'Название подборки',
  })
  name: string;
}
