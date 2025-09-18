import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';
import { validateEnv } from './core/infra/config/env';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv
    }),
  ],
})
export class AppModule { }
