import { Body, Controller, Post, UseGuards, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ValidationErrorDto } from 'src/dto/validation-error.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации',
    example: [
      {
        field: 'email',
        code: 'unique',
      },
    ],
  })
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно авторизован.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @ApiResponse({
    status: 400,
    description: 'Ошибка валидации',
    type: [ValidationErrorDto],
    example: [
      {
        field: 'username',
        code: 'userNotFound',
      },
    ],
  })
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: 'Выход пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно вышел из системы.',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  logout(@Headers('authorization') authorization?: string) {
    const token = this.authService.getToken(authorization);
    this.authService.logout(token);
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @ApiResponse({
    status: 201,
    description: 'Токен успешно обновлен',
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @ApiResponse({
    status: 401,
    description: 'Токен невалидный или истек',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Headers('authorization') authorization?: string) {
    const token = this.authService.getToken(authorization);
    const newToken = await this.authService.refreshToken(token);
    return newToken;
  }
}
