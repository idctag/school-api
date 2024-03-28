import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: Subject crud
// NOTE: Role & Jwt guard

// TODO: attendance crud
// TODO: grade crud
// TODO: class crud

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();
