import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { AllowedUsersRoles } from '../models';

export type CollectionDocument = HydratedDocument<Collection> & {
  _id: Types.ObjectId;
};

export type PopulatedCollectionDocument = Omit<CollectionDocument, 'allowedUsers'> & {
  allowedUsers: {
    id: {
      _id: Types.ObjectId;
      username: string;
    };
    role: AllowedUsersRoles;
  }[];
};

@Schema()
export class Collection {
  @Prop({ required: true })
  name: string;
  @Prop()
  description: string;
  @Prop({
    type: [
      {
        id: { type: Types.ObjectId, ref: User.name },
        role: {
          type: String,
          enum: Object.values(AllowedUsersRoles),
        },
      },
    ],
    default: [],
  })
  allowedUsers: { id: Types.ObjectId; role: AllowedUsersRoles }[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
