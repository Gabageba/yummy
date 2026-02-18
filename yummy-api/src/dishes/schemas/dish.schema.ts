import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Collection } from 'src/collections/schemas/collections.schema';
import { DishDifficulty } from '../models';
import { User } from 'src/users/schemas/user.schema';

export type DishDocument = HydratedDocument<Dish> & {
  _id: Types.ObjectId;
};

@Schema()
export class Dish {
  @Prop({ required: true })
  name: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: String,
    enum: Object.values(DishDifficulty),
    required: true,
  })
  difficulty: DishDifficulty;

  @Prop({ type: [String], required: true })
  mainIngredients: string[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: Collection.name }],
    default: [],
  })
  collections: Types.ObjectId[];

  @Prop({
    type: [{ type: Types.ObjectId, ref: User.name }],
    default: [],
  })
  author: Types.ObjectId[];
}

export const DishSchema = SchemaFactory.createForClass(Dish);
