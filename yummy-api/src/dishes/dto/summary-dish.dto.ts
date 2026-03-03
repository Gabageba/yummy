import { ApiProperty } from '@nestjs/swagger';

export class SummaryDishDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Уникальный идентификатор блюда',
  })
  id: string;

  @ApiProperty({ example: 'Омлет', description: 'Название блюда' })
  name: string;

  @ApiProperty({
    example: 'Классический омлет на завтрак',
    description: 'Описание',
  })
  description: string;
}
