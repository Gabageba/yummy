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
  @Post('/')
  createDish(
    @Body() dish: CreateAndUpdateDishDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.createDish(dish, authorization);
  }

  @Post('/list')
  @ApiOperation({ summary: 'Получение всех блюд пользователя' })
  @ApiResponse({ status: 200, description: 'Список блюд' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getDishesList(
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.getDishesList(params, authorization);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Блюдо успешно удалено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет прав на удаление',
  })
  @ApiResponse({
    status: 404,
    description: 'Блюдо не найдено',
  })
  @ApiOperation({
    summary: 'Удаление блюда',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  deleteDish(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.deleteDish(id, authorization);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Блюдо успешно обновлено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 403,
    description: 'Нет прав на обновление',
  })
  @ApiResponse({
    status: 404,
    description: 'Блюдо не найдено',
  })
  @ApiOperation({
    summary: 'Обновление блюда',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateDish(
    @Param('id') id: string,
    @Body() dish: CreateAndUpdateDishDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.updateDish(id, dish, authorization);
  }

  @Put(':id/collections')
  @ApiResponse({
    status: 200,
    description: 'Подборки блюда успешно обновлены',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({ status: 404, description: 'Блюдо не найдено' })
  @ApiOperation({
    summary: 'Обновление подборки блюда',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updateDishCollections(
    @Param('id') id: string,
    @Body() collections: string[],
    @Headers('authorization') authorization?: string,
  ) {
    return this.dishesService.updateDishCollections(
      id,
      collections,
      authorization,
    );
  }
}
