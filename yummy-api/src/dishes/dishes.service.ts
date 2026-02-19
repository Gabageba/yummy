import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import { DishesRepository } from './dishes.repository';
import { CreateAndUpdateDishDto } from './dto/create-and-update-dish.dto';
import { CollectionsRepository } from '../collections/collections.repository';
import { ValidationService } from 'src/services/validation.service';
import { DishCollectionDto } from './dto/dish-collection.dto';

@Injectable()
export class DishesService {
  constructor(
    private readonly dishesRepository: DishesRepository,
    private readonly authService: AuthService,
    private readonly collectionsRepository: CollectionsRepository,
    private readonly validationService: ValidationService,
  ) {}

  private async checkDishAuthor(id: string, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const dish = await this.dishesRepository.getDishById(id);
    if (!dish) {
      throw new NotFoundException('dish not found');
    }

    if (dish.author.toString() !== userId) {
      throw new ForbiddenException('User is not allowed to delete this dish');
    }
  }

  async createDish(dish: CreateAndUpdateDishDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const saved = await this.dishesRepository.createDish(dish, userId);
    return saved._id.toString();
  }

  async getDishesList(
    params: PageableRequestParamsDto,
    authorization?: string,
  ) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    return this.dishesRepository.getDishesList(params, userId);
  }

  async deleteDish(id: string, authorization?: string) {
    await this.checkDishAuthor(id, authorization);
    await this.dishesRepository.deleteDishById(id);
    return id;
  }

  async updateDish(
    id: string,
    collection: CreateAndUpdateDishDto,
    authorization?: string,
  ) {
    await this.checkDishAuthor(id, authorization);
    await this.dishesRepository.updateDish(id, collection);
  }

  async updateDishCollections(
    id: string,
    collections: string[],
    authorization?: string,
  ) {
    await this.checkDishAuthor(id, authorization);
    await this.dishesRepository.updateDishCollections(id, collections);
  }

  async getDishCollections(
    dishId: string,
    params: PageableRequestParamsDto,
    authorization?: string,
  ): Promise<PageableResponseDto<DishCollectionDto>> {
    this.validationService.validateObjectId(dishId);
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const result: PageableResponseDto<DishCollectionDto> | null =
      await this.collectionsRepository.getCollectionsByDishId(
        dishId,
        params,
        userId,
      );

    if (!result) {
      throw new NotFoundException('Dish not found');
    }
    return result;
  }
}
