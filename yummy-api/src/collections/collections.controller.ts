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
import { CollectionsService } from './collections.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAndUpdateCollectionDto } from './dto/create-and-update-collection.dto';
import { AuthGuard } from '@nestjs/passport';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { SummaryCollectionWithCheckedDto } from './dto/summary-collection-with-checked.dto';

@ApiTags('Подборки')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Post('/list')
  @ApiOperation({
    summary: 'Получение всех подборок пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Подборки получены',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getCollectionsList(
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.getCollectionsList(params, authorization);
  }

  @ApiOperation({
    summary: 'Создание новой подборки',
  })
  @ApiResponse({
    status: 201,
    description: 'Подборка создана',
    example: '6981c928ec4810bad9e338cf',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body() collection: CreateAndUpdateCollectionDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.createCollection(collection, authorization);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Подборка успешно удалена',
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
    description: 'Подборка не найдена',
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
    return this.collectionsService.deleteCollection(id, authorization);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Подборка успешно обновлена',
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
    description: 'Подборка не найдена',
  })
  @ApiOperation({
    summary: 'Обновление подборки',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() collection: CreateAndUpdateCollectionDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.updateCollection(
      id,
      collection,
      authorization,
    );
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Подборка успешно получена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Подборка не найдена',
  })
  @ApiOperation({
    summary: 'Получение подборки по id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findById(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.findCollectionById(id, authorization);
  }

  @Post('/search')
  @ApiResponse({
    status: 200,
    description: 'Подборки успешно получены',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Поиск подборок',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  search(
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.searchCollections(params, authorization);
  }

  @Post('/by-dish/:dishId')
  @ApiResponse({
    status: 200,
    description: 'Подборки пользователя с признаком вхождения блюда (checked)',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiResponse({
    status: 404,
    description: 'Блюдо не найдено',
  })
  @ApiOperation({
    summary:
      'Подборки по id блюда: сначала подборки, в которых есть блюдо, с полем checked',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  getCollectionsByDishId(
    @Param('dishId') dishId: string,
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ): Promise<PageableResponseDto<SummaryCollectionWithCheckedDto>> {
    return this.collectionsService.getCollectionsByDishId(
      dishId,
      params,
      authorization,
    );
  }
}
