import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ValidationService } from 'src/services/validation.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private validationService: ValidationService,
  ) {}

  async create(user: Partial<User>): Promise<UserDocument> {
    await this.validationService.validateUniqueFields([
      {
        field: 'username',
        value: user.username,
        model: this.userModel,
      },
      {
        field: 'email',
        value: user.email,
        model: this.userModel,
      },
    ]);

    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
