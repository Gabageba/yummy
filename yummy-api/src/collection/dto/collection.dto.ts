import { ApiProperty } from '@nestjs/swagger';
import { AllowedUser, AllowedUsersRoles, CollectionActions } from '../models';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export class CollectionDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Уникальный идентификатор подборки',
  })
  id: string;

  @ApiProperty({
    example: 'Название',
    description: 'Название подборки',
  })
  @IsDefined()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Описание',
    description: 'Описание подборки',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: [
      { id: '507f1f77bcf86cd799439011', role: AllowedUsersRoles.CREATOR },
    ],
    description: 'Пользователи имеющие доступ к подборке',
  })
  allowedUsers?: AllowedUser[];

  @ApiProperty({
    example: ['EDIT', 'DELETE'],
    description: 'Доступные действия для текущего пользователя',
    required: false,
    isArray: true,
  })
  actions?: CollectionActions[];
}
