import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
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

  async create(menu: CreateMenuDto, authorization?: string) {
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
}
