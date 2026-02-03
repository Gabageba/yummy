import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'admin',
    description: 'Имя пользователя',
    required: true,
  })
  @IsDefined()
  @IsString()
  username: string;

  @ApiProperty({
    example: '123456',
    description: 'Пароль',
    required: true,
  })
  @IsDefined()
  @IsString()
  @MinLength(6)
  password: string;
}
