import { ApiProperty } from '@nestjs/swagger';
import { AllowedUser, AllowedUsersRoles } from '../models';

export class MenuDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'Уникальный идентификатор меню',
  })
  id: string;

  @ApiProperty({
    example: 'Название',
    description: 'Название меню',
  })
  name: string;

  @ApiProperty({
    example: [
      { id: '507f1f77bcf86cd799439011', role: AllowedUsersRoles.CREATOR },
    ],
    description: 'Пользователи имеющие доступ к меню',
  })
  allowedUsers?: AllowedUser[];

  @ApiProperty({
    example: ['EDIT', 'DELETE'],
    description: 'Доступные действия для текущего пользователя',
    required: false,
    isArray: true,
  })
  actions?: string[];
}
