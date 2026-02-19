import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { UserId } from '../common/decorators/user-id.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: 'Получение данных текущего пользователя',
    description: 'Возвращает данные пользователя на основе JWT токена',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь возвращен',
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован.',
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден.',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@UserId() userId: string): Promise<UserDto> {
    return await this.usersService.getProfile(userId);
  }
}
