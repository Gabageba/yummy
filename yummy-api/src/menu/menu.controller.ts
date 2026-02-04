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
import { MenuService } from './menu.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAndUpdateMenuDto } from './dto/create-and-update-menu.dto';
import { AuthGuard } from '@nestjs/passport';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';

@ApiTags('Меню')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({
    summary: 'Создание нового меню',
  })
  @ApiResponse({
    status: 201,
    description: 'Меню создано',
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
    @Body() menu: CreateAndUpdateMenuDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.menuService.create(menu, authorization);
  }

  @Post('/search')
  @ApiOperation({
    summary: 'Получение всех меню пользователя',
  })
  @ApiResponse({
    status: 201,
    description: 'Меню получено',
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
    return this.menuService.findAll(params, authorization);
  }

  @Delete(':id')
  @ApiResponse({
    status: 201,
    description: 'Меню успешно удалено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Удаление меню',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(
    @Param('id') id: string,
    @Headers('authorization') authorization?: string,
  ) {
    return this.menuService.delete(id, authorization);
  }

  @Put(':id')
  @ApiResponse({
    status: 201,
    description: 'Меню успешно обновлено',
  })
  @ApiResponse({
    status: 401,
    description: 'Пользователь не авторизован',
  })
  @ApiOperation({
    summary: 'Обновление меню',
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() menu: CreateAndUpdateMenuDto,
    @Headers('authorization') authorization?: string,
  ) {
    return this.menuService.update(id, menu, authorization);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }
}
