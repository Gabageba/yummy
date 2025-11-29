import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'Имя пользователя',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
