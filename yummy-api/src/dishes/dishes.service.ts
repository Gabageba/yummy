import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { DishesRepository } from './dishes.repository';
import { CreateAndUpdateDishDto } from './dto/create-and-update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    private readonly dishesRepository: DishesRepository,
    private readonly authService: AuthService,
  ) {}

  private async checkDishAuthor(id: string, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const dish = await this.dishesRepository.getById(id);
    if (!dish) {
      throw new Error('dish not found');
    }

    if (dish.author.toString() !== userId) {
      throw new Error('User is not allowed to delete this dish');
    }
  }

  async create(dish: CreateAndUpdateDishDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const saved = await this.dishesRepository.create(dish, userId);
    return saved._id.toString();
  }

  async findAll(params: PageableRequestParamsDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    return this.dishesRepository.findAll(params, userId);
  }

  async delete(id: string, authorization?: string) {
    await this.checkDishAuthor(id, authorization);
    await this.dishesRepository.deleteById(id);
    return id;
  }
}
