import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CollectionsService } from './collections.service';
import { CollectionsController } from './collections.controller';
import { Collection, CollectionSchema } from './schemas/collections.schema';
import { CollectionsRepository } from './collections.repository';
import { Dish, DishSchema } from '../dishes/schemas/dish.schema';
import { DishesRepository } from 'src/dishes/dishes.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
      { name: Dish.name, schema: DishSchema },
    ]),
    AuthModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository, DishesRepository],
  exports: [CollectionsRepository],
})
export class CollectionsModule {}
