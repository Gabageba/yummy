import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Collection, CollectionDocument } from './schemas/collections.schema';
import { DeleteResult, Model, Types } from 'mongoose';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CreateAndUpdateCollectionDto } from './dto/create-and-update-collection.dto';
import { PageableCollectionsResponseDto } from './dto/pageable-collections-response.dto';
import { CollectionDto } from './dto/collection.dto';
import { BaseRepository } from 'src/base/base.repository';
import { AllowedUsersRoles } from './models';

@Injectable()
export class CollectionsRepository extends BaseRepository<
  CollectionDocument,
  CollectionDto
> {
  constructor(
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<CollectionDocument>,
  ) {
    super(collectionModel);
  }

  protected mapper(document: CollectionDocument): CollectionDto {
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

  async create(collection: CreateAndUpdateCollectionDto, userId: string) {
    const newCollection = new this.collectionModel({
      ...collection,
      allowedUsers: [
        { id: new Types.ObjectId(userId), role: AllowedUsersRoles.CREATOR },
      ],
    });
    const savedCollection = await newCollection.save();
    return savedCollection;
  }

  async findAll(
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
      mapper: (doc) => this.mapper(doc),
    });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return this.collectionModel.deleteOne({ _id: id });
  }

  async getById(id: string): Promise<CollectionDocument | null> {
    return this.collectionModel.findById(id);
  }

  async getByIdWithPopulate(id: string): Promise<CollectionDto | null> {
    const collection = await this.collectionModel
      .findById(id)
      .populate('allowedUsers.id');
    return collection ? this.mapper(collection) : null;
  }

  async update(
    id: string,
    collection: CreateAndUpdateCollectionDto,
  ): Promise<CollectionDocument | null> {
    return this.collectionModel
      .findByIdAndUpdate(id, collection, { new: true })
      .exec();
  }
}
