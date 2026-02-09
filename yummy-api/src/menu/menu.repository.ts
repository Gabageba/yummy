import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';
import { DeleteResult, Model, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CreateAndUpdateMenuDto } from './dto/create-and-update-menu.dto';
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
    const populated = document as unknown as {
      allowedUsers: {
        id: { _id: Types.ObjectId; username: string };
        role: AllowedUsersRoles;
      }[];
    };

    return {
      id: document._id.toString(),
      name: document.name,
      description: document.description,
      allowedUsers: populated.allowedUsers.map(({ id: user, role }) => ({
        id: user._id.toString(),
        username: user.username,
        role,
      })),
    };
  }

  async create(menu: CreateAndUpdateMenuDto, userId: string) {
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

    const populate = {
      path: 'allowedUsers.id',
      select: 'username',
    };

    return this.pageableSearch({ params, filters, populate });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.menuModel.deleteOne({ _id: id });
  }

  async getById(id: string): Promise<MenuDocument | null> {
    return this.menuModel.findById(id);
  }

  async getByIdWithPopulate(id: string): Promise<MenuDto | null> {
    const menu = await this.menuModel.findById(id).populate('allowedUsers.id');
    return menu ? this.toDto(menu) : null;
  }

  async update(
    id: string,
    updateMenu: CreateAndUpdateMenuDto,
  ): Promise<MenuDocument | null> {
    return this.menuModel
      .findByIdAndUpdate(id, updateMenu, { new: true })
      .exec();
  }
}
