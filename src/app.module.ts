import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { CoreModule } from './core/core.module';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule { }
