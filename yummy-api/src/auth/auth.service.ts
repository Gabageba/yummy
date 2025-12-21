import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ValidationService } from '../services/validation.service';
import { TokenBlacklistService } from './token-blacklist.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
    private validationService: ValidationService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  async register(username: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = this.jwtService.sign({ id: user._id.toString() });
    return token;
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

    const token = this.jwtService.sign({ id: user._id.toString() });
    return token;
  }

  logout(token: string): void {
    this.tokenBlacklistService.addToBlacklist(token);
  }

  refreshToken(token: string): Promise<string> {
    try {
      if (this.tokenBlacklistService.isBlacklisted(token)) {
        throw new UnauthorizedException('expiredToken');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.verify(token);
      if (!decoded || typeof decoded !== 'object' || !('id' in decoded)) {
        throw new UnauthorizedException('invalidToken');
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const userId = decoded.id;
      if (typeof userId !== 'string') {
        throw new UnauthorizedException('invalidTokenFormat');
      }
      const newToken = this.jwtService.sign({ id: userId });

      this.tokenBlacklistService.addToBlacklist(token);

      return Promise.resolve(newToken);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('failedRefreshToken');
    }
  }
}
