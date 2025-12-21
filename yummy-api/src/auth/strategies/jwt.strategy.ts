import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenBlacklistService } from '../token-blacklist.service';
import { Request } from 'express';

interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'SECRET';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      passReqToCallback: true, // Позволяет передать request в validate
    });
  }

  validate(req: Request, payload: JwtPayload) {
    if (!payload.id) {
      throw new UnauthorizedException('JWT payload missing id');
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    if (token && this.tokenBlacklistService.isBlacklisted(token)) {
      throw new UnauthorizedException('tokenExpired');
    }

    return { userId: payload.id };
  }
}
