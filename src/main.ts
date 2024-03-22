import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: passport-jwt

// TODO: admin crud
// NOTE: Role & Jwt guard

// TODO: manager crud
// NOTE: Role & Jwt guard

// TODO: teacher crud
// NOTE: Role & Jwt guard

// TODO: student crud
// NOTE: Role & Jwt guard

// TODO: student crud
// NOTE: Role & Jwt guard

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
