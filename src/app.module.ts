import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';

@Module({
  controllers: [AppController],
  providers: [],
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  })],
})
export class AppModule {}
