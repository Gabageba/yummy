import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsMongoId,
} from 'class-validator';
import { DishDifficulty } from '../models';

export class CreateAndUpdateDishDto {
  @ApiProperty({
    example: 'Омлет',
    description: 'Название блюда',
    required: true,
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Классический омлет',
    description: 'Описание',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: ['завтрак', 'яйца'],
    description: 'Теги',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    example: DishDifficulty.EASY,
    enum: DishDifficulty,
    description: 'Сложность',
    required: true,
  })
  @IsDefined()
  @IsEnum(DishDifficulty)
  difficulty: DishDifficulty;

  @ApiProperty({
    example: ['яйца', 'молоко'],
    description: 'Основные ингредиенты',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mainIngredients?: string[];

  @ApiProperty({
    example: ['507f1f77bcf86cd799439011'],
    description: 'ID подборок',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  collectionIds?: string[];
}
