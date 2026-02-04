import { Injectable } from '@nestjs/common';
import { CreateAndUpdateMenuDto } from './dto/create-and-update-menu.dto';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { MenuRepository } from './menu.repository';
import { AllowedUsersRoles } from './models';
import { MenuDto } from './dto/menu.dto';

@Injectable()
export class MenuService {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly authService: AuthService,
  ) {}

  private async checkMenuUserRole(id: string, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const menu = await this.menuRepository.getMenuById(id);
    if (!menu) {
      throw new Error('Menu not found');
    }

    const userRole = menu.allowedUsers.find(
      (u) => u.id.toString() === userId,
    )?.role;

    if (
      userRole !== AllowedUsersRoles.CREATOR &&
      userRole !== AllowedUsersRoles.EDITOR
    ) {
      throw new Error('User is not allowed to delete this menu');
    }
  }

  async create(menu: CreateAndUpdateMenuDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const savedMenu = await this.menuRepository.create(menu, userId);

    return savedMenu._id.toString();
  }

  private prepareResults(results: MenuDto[], userId: string) {
    return results.map((menu) => {
      const actions: string[] = [];

      const currentUserRole = menu.allowedUsers?.find(
        (u) => u.id === userId,
      )?.role;

      switch (currentUserRole) {
        case AllowedUsersRoles.CREATOR:
          actions.push('EDIT');
          actions.push('DELETE');
          break;
        case AllowedUsersRoles.EDITOR:
          actions.push('EDIT');
          break;
        default:
          // delete menu.allowedUsers;
          break;
      }

      return {
        ...menu,
        actions,
      };
    });
  }

  async findAll(params: PageableRequestParamsDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const { results, ...restData } = await this.menuRepository.findAll(
      params,
      userId,
    );

    return {
      ...restData,
      results: this.prepareResults(results, userId),
    };
  }

  async delete(id: string, authorization?: string) {
    await this.checkMenuUserRole(id, authorization);
    await this.menuRepository.deleteById(id);
    return id;
  }

  async update(
    id: string,
    menu: CreateAndUpdateMenuDto,
    authorization?: string,
  ) {
    await this.checkMenuUserRole(id, authorization);
    await this.menuRepository.update(id, menu);
  }
}
