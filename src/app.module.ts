import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { validateEnv } from './core/infra/config/env';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './core/guards/roles.guard';

@Module({
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),
  ],
})
export class AppModule { }
