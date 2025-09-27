import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'username',
    description: 'Имя пользователя',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Электронный адресс',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль',
  })
  @IsString()
  @MinLength(6)
  password: string;
}
