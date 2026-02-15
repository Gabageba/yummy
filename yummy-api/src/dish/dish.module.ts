import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './schemas/dish.schema';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { DishRepository } from './dish.repository';
import { AuthModule } from '../auth/auth.module';
import { CollectionModule } from '../collection/collection.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
    AuthModule,
    CollectionModule,
  ],
  controllers: [DishController],
  providers: [DishService, DishRepository],
})
export class DishModule {}
