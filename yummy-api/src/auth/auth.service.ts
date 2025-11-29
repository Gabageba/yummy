import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ValidationService } from '../services/validation.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private validationService: ValidationService,
  ) {}

  async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }

  async login(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      this.validationService.throwValidationError('username', 'userNotFound');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      this.validationService.throwValidationError(
        'password',
        'passwordInvalid',
      );
    }

    const token = this.jwtService.sign({ id: user._id });
    return { token };
  }
}
