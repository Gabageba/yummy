import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dish, DishDocument } from './schemas/dish.schema';
import { Model, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { PageableDishResponseDto } from './dto/pageable-dish-response.dto';
import { DishDto } from './dto/dish.dto';
import { BaseRepository } from 'src/base/base.repository';

type PopulatedDishDocument = DishDocument & {
  collections: { _id: Types.ObjectId; name: string }[];
};

@Injectable()
export class DishRepository extends BaseRepository<DishDocument, DishDto> {
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

  // async create(dto: CreateAndUpdateDishDto): Promise<DishDocument> {
  //   const menus = (dto.menuIds ?? []).map((id) => new Types.ObjectId(id));
  //   const dish = new this.dishModel({
  //     name: dto.name,
  //     description: dto.description ?? '',
  //     tags: dto.tags ?? [],
  //     difficulty: dto.difficulty,
  //     mainIngredients: dto.mainIngredients ?? [],
  //     menus,
  //   });
  //   return dish.save();
  // }

  async findAll(
    params: PageableRequestParamsDto,
    collectionId: string,
  ): Promise<PageableDishResponseDto> {
    const filters = {
      collections: new Types.ObjectId(collectionId),
    };

    return this.pageableSearch({
      params,
      queryField: 'name',
      filters,
    });
  }

  // async deleteById(id: string): Promise<DeleteResult> {
  //   return this.dishModel.deleteOne({ _id: id });
  // }

  // async getById(id: string): Promise<DishDocument | null> {
  //   return this.dishModel.findById(id);
  // }

  // async getByIdWithPopulate(id: string): Promise<DishDto | null> {
  //   const dish = await this.dishModel
  //     .findById(id)
  //     .populate('menus', 'name')
  //     .exec();
  //   return dish ? this.toDto(dish as unknown as PopulatedDishDocument) : null;
  // }

  // async update(
  //   id: string,
  //   dto: CreateAndUpdateDishDto,
  // ): Promise<DishDocument | null> {
  //   const menus = (dto.menuIds ?? []).map((id) => new Types.ObjectId(id));
  //   return this.dishModel
  //     .findByIdAndUpdate(
  //       id,
  //       {
  //         name: dto.name,
  //         description: dto.description ?? '',
  //         tags: dto.tags ?? [],
  //         difficulty: dto.difficulty,
  //         mainIngredients: dto.mainIngredients ?? [],
  //         menus,
  //       },
  //       { new: true },
  //     )
  //     .exec();
  // }
}
