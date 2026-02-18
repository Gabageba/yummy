import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAndUpdateDishDto } from './dto/create-and-update-dish.dto';
import { AuthGuard } from '@nestjs/passport';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';

@ApiTags('Блюда')
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @ApiOperation({ summary: 'Создание блюда' })
  @ApiResponse({
    status: 201,
    description: 'Блюдо создано',
    example: '6981c928ec4810bad9e338cf',
  })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('/create')
  create(
    @Body() dish: CreateAndUpdateDishDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.create(dish, authorization);
  }

  @Post('/search')
  @ApiOperation({ summary: 'Поиск блюд с пагинацией' })
  @ApiResponse({ status: 201, description: 'Список блюд' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.findAll(params, authorization);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Подборка успешно удалена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Удаление подборки',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.delete(id, authorization);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Блюдо успешно обновлено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Обновление блюда',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() dish: CreateAndUpdateDishDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.update(id, dish, authorization);
  }
}
