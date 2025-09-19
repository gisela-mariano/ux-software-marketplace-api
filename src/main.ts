import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(AppModule.name);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("Marketplace API")
    .setDescription("API for the Marketplace")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();
  const documentFactoy = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactoy);


  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Server is running on port ${process.env.PORT ?? 3000} 🚀`);
}
bootstrap();
