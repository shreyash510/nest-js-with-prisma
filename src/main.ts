import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // NestFactory provide few methods that allows creating application instance.
  const app = await NestFactory.create(AppModule);
  // setGlobalPrefix allows to define a global URL prefix for all the routes in the application
  const config = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.setGlobalPrefix('api'); 

  await app.listen(3000);
}
bootstrap();
