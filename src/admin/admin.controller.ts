import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role-guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Prisma, Role } from '@prisma/client';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Post()
  create(
    @Body('data')
    data: Prisma.AdminCreateInput,
  ) {
    console.log(data);
    return this.adminService.create(data);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update() {
    return this.adminService.update();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
