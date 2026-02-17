import { Injectable } from '@nestjs/common';
import { CreateAndUpdateCollectionDto } from './dto/create-and-update-collection.dto';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CollectionRepository } from './collection.repository';
import { AllowedUsersRoles } from './models';
import { CollectionDto } from './dto/collection.dto';

@Injectable()
export class CollectionService {
  constructor(
    private readonly collectionRepository: CollectionRepository,
    private readonly authService: AuthService,
  ) {}

  private async checkCollectionUserRole(id: string, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const collection = await this.collectionRepository.getById(id);
    if (!collection) {
      throw new Error('Collection not found');
    }

    const userRole = collection.allowedUsers.find(
      (u) => u.id.toString() === userId,
    )?.role;

    if (
      userRole !== AllowedUsersRoles.CREATOR &&
      userRole !== AllowedUsersRoles.EDITOR
    ) {
      throw new Error('User is not allowed to delete this collection');
    }
  }

  async create(
    collection: CreateAndUpdateCollectionDto,
    authorization?: string,
  ) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const savedCollection = await this.collectionRepository.create(
      collection,
      userId,
    );

    return savedCollection._id.toString();
  }

  private prepareResults(results: CollectionDto[], userId: string) {
    return results.map((collection) => {
      const actions: string[] = [];

      const currentUserRole = collection.allowedUsers?.find(
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
          break;
      }

      return {
        ...collection,
        actions,
      };
    });
  }

  async findAll(params: PageableRequestParamsDto, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const { results, ...restData } = await this.collectionRepository.findAll(
      params,
      userId,
    );

    return {
      ...restData,
      results: this.prepareResults(results, userId),
    };
  }

  async delete(id: string, authorization?: string) {
    await this.checkCollectionUserRole(id, authorization);
    await this.collectionRepository.deleteById(id);
    return id;
  }

  async update(
    id: string,
    collection: CreateAndUpdateCollectionDto,
    authorization?: string,
  ) {
    await this.checkCollectionUserRole(id, authorization);
    await this.collectionRepository.update(id, collection);
  }

  async findCollectionById(id: string) {
    const collection = await this.collectionRepository.getByIdWithPopulate(id);
    if (!collection) {
      throw new Error('Collection not found');
    }
    return collection;
  }
}
