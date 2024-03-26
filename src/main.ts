import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: admin crud
// NOTE: Role & Jwt guard

// TODO: manager crud
// NOTE: Role & Jwt guard

// TODO: teacher crud
// NOTE: Role & Jwt guard

// TODO: student crud
// NOTE: Role & Jwt guard

// TODO: Subject crud
// NOTE: Role & Jwt guard

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8080);
}
bootstrap();
