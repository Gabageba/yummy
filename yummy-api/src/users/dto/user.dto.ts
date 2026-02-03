import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: '507f1f77bcf86cd799439011',
    description: 'ID пользователя',
  })
  id: string;

  @ApiProperty({
    example: 'username',
    description: 'Имя пользователя',
  })
  username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Электронный адрес',
  })
  email: string;
}
