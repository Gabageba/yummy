import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
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
  logout(@Request() req: Request & { headers: { authorization?: string } }) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      this.authService.logout(token);
    }
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @ApiResponse({
    status: 200,
    description: 'Токен успешно обновлен.',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzNmZTM3OWZlZTRkMjVkMDc2YzExMiIsImlhdCI6MTc2NTAxNjg3NywiZXhwIjoxNzY1MTAzMjc3fQ.70pazmk01Yvm9Wn23RtyegiIDRErOvOc3eKWEOomrAM',
  })
  @ApiResponse({
    status: 401,
    description: 'Токен невалидный или истек.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(
    @Request() req: Request & { headers: { authorization?: string } },
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('tokenNotFound');
    }
    const token = authHeader.substring(7);
    const newToken = await this.authService.refreshToken(token);
    return newToken;
  }
}
