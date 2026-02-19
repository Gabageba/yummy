import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './schemas/dish.schema';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { DishesRepository } from './dishes.repository';
import { AuthModule } from '../auth/auth.module';
import { CollectionsModule } from '../collections/collections.module';
import { ValidationModule } from '../services/validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Dish.name, schema: DishSchema }]),
    AuthModule,
    CollectionsModule,
    ValidationModule,
  ],
  controllers: [DishesController],
  providers: [DishesService, DishesRepository],
})
export class DishesModule {}
