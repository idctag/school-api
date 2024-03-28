import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { Prisma, Role } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role-guard';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(
    @Body('data')
    data: Prisma.TeacherCreateInput,
  ) {
    return this.teacherService.create(data);
  }

  @Get()
  findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.TeacherUpdateInput,
  ) {
    return this.teacherService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
