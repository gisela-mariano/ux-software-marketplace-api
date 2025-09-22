import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService<Env, true>) {}

  get nodeEnv(): Env['NODE_ENV'] {
    return this.config.get('NODE_ENV', { infer: true });
  }

  get port(): number {
    return this.config.get('PORT', { infer: true });
  }

  get databaseUrl(): string {
    return this.config.get('DATABASE_URL', { infer: true });
  }

  get jwtSecret(): string {
    return this.config.get('JWT_SECRET', { infer: true });
  }

  get baseUrl(): string {
    return this.config.get('BASE_URL', { infer: true });
  }
}
