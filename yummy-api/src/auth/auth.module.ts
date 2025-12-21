import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TokenBlacklistService } from './token-blacklist.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'SECRET',
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenBlacklistService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, TokenBlacklistService],
})
export class AuthModule {}
