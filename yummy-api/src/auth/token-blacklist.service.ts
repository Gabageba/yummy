import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenBlacklistService implements OnModuleInit {
  private blacklist: Set<string> = new Set();
  private tokenExpirations: Map<string, number> = new Map();

  constructor(private jwtService: JwtService) {}

  INTERVAL = 5 * 60 * 1000;

  onModuleInit() {
    setInterval(() => {
      this.cleanExpiredTokens();
    }, this.INTERVAL);
  }

  addToBlacklist(token: string): void {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const decoded = this.jwtService.decode(token);
      if (
        decoded &&
        typeof decoded === 'object' &&
        decoded !== null &&
        'exp' in decoded
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const exp = decoded.exp;
        if (typeof exp === 'number' && exp > 0) {
          this.blacklist.add(token);
          this.tokenExpirations.set(token, exp * 1000);
        }
      }
    } catch {
      this.blacklist.add(token);
    }
  }

  isBlacklisted(token: string): boolean {
    if (this.blacklist.has(token)) {
      const expiration = this.tokenExpirations.get(token);
      if (expiration && expiration < Date.now()) {
        this.blacklist.delete(token);
        this.tokenExpirations.delete(token);
        return false;
      }
      return true;
    }
    return false;
  }

  private cleanExpiredTokens(): void {
    const now = Date.now();
    for (const [token, expiration] of this.tokenExpirations.entries()) {
      if (expiration < now) {
        this.blacklist.delete(token);
        this.tokenExpirations.delete(token);
      }
    }
  }
}
