import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish, DishDocument } from './schemas/dish.schema';
import { DeleteResult, Model, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableDishesResponseDto } from './dto/pageable-dishes-response.dto';
import { DishDto } from './dto/dish.dto';
import { BaseRepository } from 'src/base/base.repository';
import { CreateAndUpdateDishDto } from './dto/create-and-update-dish.dto';

type PopulatedDishDocument = DishDocument & {
  collections: { _id: Types.ObjectId; name: string }[];
};

@Injectable()
export class DishesRepository extends BaseRepository<DishDocument, DishDto> {
  constructor(
    @InjectModel(Dish.name)
    private readonly dishModel: Model<DishDocument>,
  ) {
    super(dishModel);
  }

  protected toDto(document: DishDocument | PopulatedDishDocument): DishDto {
    const doc = document as PopulatedDishDocument;
    const collectionsRaw = doc.collections ?? [];
    const collectionIds = collectionsRaw.map((m) =>
      typeof m === 'object' && m && '_id' in m
        ? (m as { _id: Types.ObjectId })._id.toString()
        : (m as Types.ObjectId).toString(),
    );

    return {
      id: doc._id.toString(),
      name: doc.name,
      description: doc.description ?? '',
      tags: doc.tags ?? [],
      difficulty: doc.difficulty,
      mainIngredients: doc.mainIngredients ?? [],
      collectionIds,
    };
  }

  async create(
    dto: CreateAndUpdateDishDto,
    userId: string,
  ): Promise<DishDocument> {
    const dish = new this.dishModel({
      name: dto.name,
      description: dto.description ?? '',
      tags: dto.tags ?? [],
      difficulty: dto.difficulty,
      mainIngredients: dto.mainIngredients ?? [],
      author: userId,
    });
    return dish.save();
  }

  async findAll(
    params: PageableRequestParamsDto,
    userId: string,
  ): Promise<PageableDishesResponseDto> {
    const filters = { author: new Types.ObjectId(userId) };

    return this.pageableSearch({
      params,
      filters,
    });
  }

  async getById(id: string): Promise<DishDocument | null> {
    return this.dishModel.findById(id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.dishModel.deleteOne({ _id: id });
  }
}
