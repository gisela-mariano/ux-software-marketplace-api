import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(AppModule.name);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  const config = new DocumentBuilder()
    .setTitle("Marketplace API")
    .setDescription("API for the Marketplace")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const documentFactoy = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, documentFactoy);


  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port ${process.env.PORT ?? 3000} 🚀`);
}
bootstrap();
