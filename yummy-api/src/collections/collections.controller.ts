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

@ApiTags('Подборки')
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

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
  @Post('/create')
  create(
    @Body() collection: CreateAndUpdateCollectionDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.create(collection, authorization);
  }

  @Post('/search')
  @ApiOperation({
    summary: 'Получение всех подборок пользователя',
  })
  @ApiResponse({
    status: 201,
    description: 'Подборки получены',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(
    @Body() params: PageableRequestParamsDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.collectionsService.findAll(params, authorization);
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
    return this.collectionsService.delete(id, authorization);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Подборка успешно обновлена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
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
    return this.collectionsService.update(id, collection, authorization);
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'Подборка успешно получена',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Получение подборки по id',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findById(@Param('id') id: string) {
    return this.collectionsService.findCollectionById(id);
  }
}
