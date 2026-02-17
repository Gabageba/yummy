import { ApiProperty } from '@nestjs/swagger';
import { DishDifficulty } from '../models';

export class DishCollectionRefDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID подборки',
  })
  id: string;

  @ApiProperty({ example: 'Завтраки', description: 'Название подборки' })
  name: string;
}

export class DishDto {
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

  @ApiProperty({
    example: ['завтрак', 'яйца'],
    description: 'Теги',
    isArray: true,
  })
  tags: string[];

  @ApiProperty({
    example: DishDifficulty.EASY,
    enum: DishDifficulty,
    description: 'Сложность приготовления',
  })
  difficulty: DishDifficulty;

  @ApiProperty({
    example: ['яйца', 'молоко', 'соль'],
    description: 'Основные ингредиенты',
    isArray: true,
  })
  mainIngredients: string[];

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011'],
    description: 'ID подборок, в которых находится блюдо',
    isArray: true,
  })
  collectionIds: string[];
}
