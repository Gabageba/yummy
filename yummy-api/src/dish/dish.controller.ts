import {
  Controller,
  Post,
  Body,
  UseGuards,
  Headers,
  Delete,
  Param,
  Put,
  Get,
} from '@nestjs/common';
import { DishService } from './dish.service';
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
@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  // @ApiOperation({ summary: 'Создание блюда' })
  // @ApiResponse({
  //   status: 201,
  //   description: 'Блюдо создано',
  //   example: '6981c928ec4810bad9e338cf',
  // })
  // @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // @Post('/create')
  // create(
  //   @Body() dto: CreateAndUpdateDishDto,
  //   @Headers('authorization') authorization?: string,
  // ) {
  //   return this.dishService.create(dto, authorization);
  // }

  @Post(':collectionId/search')
  @ApiOperation({ summary: 'Поиск блюд с пагинацией' })
  @ApiResponse({ status: 201, description: 'Список блюд' })
  @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Body() params: PageableRequestParamsDto,
    @Param('collectionId') collectionId: string,
  ) {
    return this.dishService.findAll(params, collectionId);
  }

  // @Delete(':id')
  // @ApiResponse({ status: 200, description: 'Блюдо удалено' })
  // @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  // @ApiOperation({ summary: 'Удаление блюда' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // remove(
  //   @Param('id') id: string,
  //   @Headers('authorization') authorization?: string,
  // ) {
  //   return this.dishService.delete(id, authorization);
  // }

  // @Put(':id')
  // @ApiResponse({ status: 200, description: 'Блюдо обновлено' })
  // @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  // @ApiOperation({ summary: 'Обновление блюда' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // update(
  //   @Param('id') id: string,
  //   @Body() dto: CreateAndUpdateDishDto,
  //   @Headers('authorization') authorization?: string,
  // ) {
  //   return this.dishService.update(id, dto, authorization);
  // }

  // @Get(':id')
  // @ApiResponse({ status: 200, description: 'Блюдо получено' })
  // @ApiResponse({ status: 401, description: 'Пользователь не авторизован' })
  // @ApiOperation({ summary: 'Получение блюда по id (с заполненными меню)' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('jwt'))
  // findById(@Param('id') id: string) {
  //   return this.dishService.findById(id);
  // }
}
