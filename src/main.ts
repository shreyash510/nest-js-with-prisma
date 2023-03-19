import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // NestFactory provide few methods that allows creating application instance.
  const app = await NestFactory.create(AppModule);
  // setGlobalPrefix allows to define a global URL prefix for all the routes in the application
  app.setGlobalPrefix('api'); 
  await app.listen(3000);
}
bootstrap();
