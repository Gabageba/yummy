import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { Collection, CollectionSchema } from './schemas/collections.schema';
import { CollectionsRepository } from './collections.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
    AuthModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository],
  exports: [CollectionsRepository],
})
export class CollectionsModule {}
