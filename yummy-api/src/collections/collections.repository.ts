import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, CollectionDocument } from './schemas/collections.schema';
import { DeleteResult, Model, PipelineStage, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CreateAndUpdateCollectionDto } from './dto/create-and-update-collection.dto';
import { PageableResponseDto } from 'src/dto/pageable/pageable-response.dto';
import {
  PageableCollectionsResponseDto,
  PageableSummaryCollectionsResponseDto,
} from './dto/pageable-collections-response.dto';
import { CollectionDto } from './dto/collection.dto';
import { BaseRepository } from 'src/base/base.repository';
import { AllowedUsersRoles, CollectionActions } from './models';
import { SummaryCollectionDto } from './dto/summary-collection.dto';
import { SummaryCollectionWithCheckedDto } from './dto/summary-collection-with-checked.dto';
import { Dish, DishDocument } from '../dishes/schemas/dish.schema';

type PopulatedAllowedUsers = {
  id: { _id: Types.ObjectId; username: string };
  role: AllowedUsersRoles;
}[];

@Injectable()
export class CollectionsRepository extends BaseRepository<
  CollectionDocument,
  CollectionDto
> {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<CollectionDocument>,
    @InjectModel(Dish.name)
    private readonly dishModel: Model<DishDocument>,
  ) {
    super(collectionModel);
  }

  protected getCollectionActions(
    allowedUsers: PopulatedAllowedUsers,
    userId: string,
  ) {
    const actions: CollectionActions[] = [];

    const currentUserRole = allowedUsers?.find(
      (u) => u.id._id.toString() === userId,
    )?.role;

    switch (currentUserRole) {
      case AllowedUsersRoles.CREATOR:
        actions.push(CollectionActions.EDIT);
        actions.push(CollectionActions.DELETE);
        break;
      case AllowedUsersRoles.EDITOR:
        actions.push(CollectionActions.EDIT);
        break;
      default:
        break;
    }

    return actions;
  }

  protected collectionMapper(
    document: CollectionDocument,
    userId: string,
  ): CollectionDto {
    const populated = document as unknown as {
      allowedUsers: PopulatedAllowedUsers;
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
      actions: this.getCollectionActions(populated.allowedUsers, userId),
    };
  }

  protected summaryCollectionMapper(
    document: CollectionDocument,
  ): SummaryCollectionDto {
    return {
      id: document._id.toString(),
      name: document.name,
    };
  }

  async getCollectionsList(
    params: PageableRequestParamsDto,
    userId: string,
  ): Promise<PageableCollectionsResponseDto> {
    const filters = {
      'allowedUsers.id': new Types.ObjectId(userId),
    };

    const populate = {
      path: 'allowedUsers.id',
      select: 'username',
    };

    return this.pageableSearch({
      params,
      filters,
      populate,
      mapper: (doc) => this.collectionMapper(doc, userId),
    });
  }

  async createCollection(
    collection: CreateAndUpdateCollectionDto,
    userId: string,
  ) {
    const newCollection = new this.collectionModel({
      ...collection,
      allowedUsers: [
        { id: new Types.ObjectId(userId), role: AllowedUsersRoles.CREATOR },
      ],
    });
    const savedCollection = await newCollection.save();
    return savedCollection;
  }

  async deleteCollectionById(id: string): Promise<DeleteResult> {
    return this.collectionModel.deleteOne({ _id: id });
  }

  async getCollectionById(id: string): Promise<CollectionDocument | null> {
    return this.collectionModel.findById(id);
  }

  async getCollectionByIdWithPopulate(
    id: string,
    userId: string,
  ): Promise<CollectionDto | null> {
    const collection = await this.collectionModel
      .findById(id)
      .populate('allowedUsers.id');
    return collection ? this.collectionMapper(collection, userId) : null;
  }

  async updateCollection(
    id: string,
    collection: CreateAndUpdateCollectionDto,
  ): Promise<CollectionDocument | null> {
    return this.collectionModel
      .findByIdAndUpdate(id, collection, { new: true })
      .exec();
  }

  async searchCollections(
    params: PageableRequestParamsDto,
    userId: string,
  ): Promise<PageableSummaryCollectionsResponseDto> {
    const filters = {
      'allowedUsers.id': new Types.ObjectId(userId),
    };

    return this.pageableSearch({
      params,
      filters,
      mapper: (doc) => this.collectionMapper(doc, userId),
    });
  }

  async getCollectionsByDishId(
    dishId: string,
    params: PageableRequestParamsDto,
    userId: string,
  ): Promise<PageableResponseDto<SummaryCollectionWithCheckedDto> | null> {
    const dish = await this.dishModel
      .findById(dishId)
      .select('collections')
      .lean()
      .exec();
    if (!dish) {
      return null;
    }

    const dishCollectionIds: Types.ObjectId[] = Array.isArray(dish.collections)
      ? dish.collections.filter((id): id is Types.ObjectId => id != null)
      : [];
    const userIdObj = new Types.ObjectId(userId);

    const pipelineStages: PipelineStage[] = [
      { $match: { 'allowedUsers.id': userIdObj } },
      {
        $addFields: {
          checked: { $in: ['$_id', dishCollectionIds] },
        },
      },
    ];
    if (params.query?.trim()) {
      pipelineStages.push({
        $match: { name: { $regex: params.query.trim(), $options: 'i' } },
      });
    }
    pipelineStages.push({ $sort: { checked: -1, name: 1 } });

    return this.pageableAggregation(
      params,
      pipelineStages,
      (doc) =>
        ({
          id: (doc._id as Types.ObjectId).toString(),
          name: doc.name as string,
          checked: Boolean(doc.checked),
        }) as SummaryCollectionWithCheckedDto,
    );
  }
}
