import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO: implement orm
// TODO: data base schema
// TODO: user crud
// TODO: seed data (faker?)
// TODO: passport-jwt
// TODO: argon2 password hash

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
