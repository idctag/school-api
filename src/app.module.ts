import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [AuthModule, UsersModule, AdminModule, ManagerModule],
})
export class AppModule { }
