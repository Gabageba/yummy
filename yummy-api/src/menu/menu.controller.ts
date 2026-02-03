import { Controller, Post, Body, UseGuards, Headers } from '@nestjs/common';
import { MenuService } from './menu.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMenuDto } from './dto/create-menu.dto';
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
    @Body() menu: CreateMenuDto,
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

  // @Get()
  // findAll() {
  //   return this.menuService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.menuService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
  //   return this.menuService.update(+id, updateMenuDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.menuService.remove(+id);
  // }
}
