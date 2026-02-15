import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { DishRepository } from './dish.repository';

@Injectable()
export class DishService {
  constructor(
    private readonly dishRepository: DishRepository,
    private readonly authService: AuthService,
  ) {}

  // private async checkDishAccess(id: string, authorization?: string) {
  //   const userId =
  //     this.authService.getUserIdFromAuthorizationHeader(authorization);
  //   const dish = await this.dishRepository.getById(id);
  //   if (!dish) {
  //     throw new Error('Dish not found');
  //   }
  //   const menuIds = dish.menus?.map((m) => m.toString()) ?? [];
  //   for (const menuId of menuIds) {
  //     const menu = await this.menuRepository.getById(menuId);
  //     if (!menu) continue;
  //     const userRole = menu.allowedUsers?.find(
  //       (u) => u.id.toString() === userId,
  //     )?.role;
  //     if (
  //       userRole === AllowedUsersRoles.CREATOR ||
  //       userRole === AllowedUsersRoles.EDITOR
  //     ) {
  //       return;
  //     }
  //   }
  //   throw new Error('User is not allowed to modify this dish');
  // }

  // async create(dto: CreateAndUpdateDishDto, authorization?: string) {
  //   this.authService.getUserIdFromAuthorizationHeader(authorization);
  //   const saved = await this.dishRepository.create(dto);
  //   return saved._id.toString();
  // }

  async findAll(params: PageableRequestParamsDto, collectionId: string) {
    return this.dishRepository.findAll(params, collectionId);
  }

  // async delete(id: string, authorization?: string) {
  //   await this.checkDishAccess(id, authorization);
  //   await this.dishRepository.deleteById(id);
  //   return id;
  // }

  // async update(
  //   id: string,
  //   dto: CreateAndUpdateDishDto,
  //   authorization?: string,
  // ) {
  //   await this.checkDishAccess(id, authorization);
  //   await this.dishRepository.update(id, dto);
  // }

  // async findById(id: string) {
  //   const dish = await this.dishRepository.getByIdWithPopulate(id);
  //   if (!dish) {
  //     throw new Error('Dish not found');
  //   }
  //   return dish;
  // }
}
