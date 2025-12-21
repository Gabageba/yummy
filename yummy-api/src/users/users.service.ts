import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ValidationService } from '../services/validation.service';
import { UserResponseDto } from './dto/user-response.dto';

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

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async getProfile(userId: string): Promise<UserResponseDto> {
    const user = await this.findById(userId);
    if (!user || !user._id) {
      throw new NotFoundException('Пользователь не найден');
    }

    const result: UserResponseDto = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    return result;
  }
}
