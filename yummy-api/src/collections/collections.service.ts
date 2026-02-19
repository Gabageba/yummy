import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAndUpdateCollectionDto } from './dto/create-and-update-collection.dto';
import { AuthService } from 'src/auth/auth.service';
import { PageableRequestParamsDto } from 'src/dto/pageable/pageable-request-params.dto';
import { CollectionsRepository } from './collections.repository';
import { AllowedUsersRoles } from './models';
import { ValidationService } from 'src/services/validation.service';

@Injectable()
export class CollectionsService {
  constructor(
    private readonly collectionsRepository: CollectionsRepository,
    private readonly authService: AuthService,
    private readonly validationService: ValidationService,
  ) {}

  private async checkCollectionUserRole(id: string, authorization?: string) {
    this.validationService.validateObjectId(id);
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    const collection = await this.collectionsRepository.getCollectionById(id);
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }

    const userRole = collection.allowedUsers.find(
      (u) => u.id.toString() === userId,
    )?.role;

    if (
      userRole !== AllowedUsersRoles.CREATOR &&
      userRole !== AllowedUsersRoles.EDITOR
    ) {
      throw new ForbiddenException(
        'User is not allowed to delete this collection',
      );
    }
  }

  async getCollectionsList(
    params: PageableRequestParamsDto,
    authorization?: string,
  ) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const collections = await this.collectionsRepository.getCollectionsList(
      params,
      userId,
    );
    return collections;
  }

  async createCollection(
    collection: CreateAndUpdateCollectionDto,
    authorization?: string,
  ) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);

    const savedCollection = await this.collectionsRepository.createCollection(
      collection,
      userId,
    );

    return savedCollection._id.toString();
  }

  async deleteCollection(id: string, authorization?: string) {
    await this.checkCollectionUserRole(id, authorization);
    await this.collectionsRepository.deleteCollectionById(id);
    return id;
  }

  async updateCollection(
    id: string,
    collection: CreateAndUpdateCollectionDto,
    authorization?: string,
  ) {
    await this.checkCollectionUserRole(id, authorization);
    await this.collectionsRepository.updateCollection(id, collection);
  }

  async findCollectionById(id: string, authorization?: string) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    this.validationService.validateObjectId(id);

    const collection =
      await this.collectionsRepository.getCollectionByIdWithPopulate(
        id,
        userId,
      );
    if (!collection) {
      throw new NotFoundException('Collection not found');
    }
    return collection;
  }

  async searchCollections(
    params: PageableRequestParamsDto,
    authorization?: string,
  ) {
    const userId =
      this.authService.getUserIdFromAuthorizationHeader(authorization);
    return this.collectionsRepository.searchCollections(params, userId);
  }
}
