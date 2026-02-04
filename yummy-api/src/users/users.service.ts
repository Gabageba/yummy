import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ValidationService } from '../services/validation.service';
import { UserDto } from './dto/user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private validationService: ValidationService,
    private usersRepository: UsersRepository,
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

    return this.usersRepository.create(user);
  }

  async findByUsername(username: string): Promise<UserDocument | null> {
    return this.usersRepository.findByUserName(username);
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.usersRepository.findById(id);
  }

  async getProfile(userId: string): Promise<UserDto> {
    const user = await this.usersRepository.findById(userId);
    if (!user || !user._id) {
      throw new NotFoundException('Пользователь не найден');
    }

    const result: UserDto = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };

    return result;
  }
}
