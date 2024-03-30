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
import { Prisma, Role } from '@prisma/client';
import { Roles } from 'src/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/role-guard';
import { StudentService } from './student.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Student')
@ApiBearerAuth()
@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MANAGER)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(
    @Body('data')
    data: Prisma.StudentCreateInput,
  ) {
    return this.studentService.create(data);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body('data') data: Prisma.StudentUpdateInput,
  ) {
    return this.studentService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
