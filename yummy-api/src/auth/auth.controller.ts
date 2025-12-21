import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно зарегистрирован.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body.username, body.email, body.password);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно авторизованы.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body.username, body.password);
  }
}
