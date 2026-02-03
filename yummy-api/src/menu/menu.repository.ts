import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';
import { Model, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { PageableMenuResponseDto } from './dto/pageable-menu-response.dto';
import { MenuDto } from './dto/menu.dto';
import { BaseRepository } from 'src/base/base.repository';
import { AllowedUsersRoles } from './models';

@Injectable()
export class MenuRepository extends BaseRepository<MenuDocument, MenuDto> {
  constructor(
    @InjectModel(Menu.name)
    private readonly menuModel: Model<MenuDocument>,
  ) {
    super(menuModel);
  }

  protected toDto(document: MenuDocument): MenuDto {
    return {
      id: document._id.toString(),
      name: document.name,
      allowedUsers: document.allowedUsers.map(({ id, role }) => ({
        id: id.toString(),
        role,
      })),
    };
  }

  async create(menu: CreateMenuDto, userId: string) {
    const newMenu = new this.menuModel({
      ...menu,
      allowedUsers: [
        { id: new Types.ObjectId(userId), role: AllowedUsersRoles.CREATOR },
      ],
    });
    const savedMenu = await newMenu.save();
    return savedMenu;
  }

  async findAll(
    params: PageableRequestParamsDto,
    userId: string,
  ): Promise<PageableMenuResponseDto> {
    const filters = {
      'allowedUsers.id': new Types.ObjectId(userId),
    };

    return this.pageableSearch(params, filters);
  }
}
