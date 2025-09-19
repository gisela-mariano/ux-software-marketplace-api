import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { validateEnv } from './core/infra/config/env';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
  imports: [
    AuthModule,
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),
  ],
})
export class AppModule { }
