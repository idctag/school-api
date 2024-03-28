import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class TeacherService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TeacherCreateInput): Promise<any> {
    if (data.user.create?.password) {
      data.user.create.password = await argon2.hash(data.user.create.password);
    }
    try {
      const teacher = await this.prisma.teacher.create({
        data: {
          ...data,
        },
        include: {
          user: true,
        },
      });
      return teacher;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new Error('teacher already exists');
      } else {
        throw new err();
      }
    }
  }

  async findAll() {
    const teachers = await this.prisma.teacher.findMany({
      include: { user: true },
    });
    return teachers;
  }

  async findOne(id: number) {
    const teacher = await this.prisma.teacher.findUnique({
      where: { id: id },
      include: { user: true },
    });
    return teacher;
  }

  async update(id: number, data: Prisma.TeacherUpdateInput) {
    if (data.user?.update?.password) {
      data.user.update.password = await argon2.hash(
        data.user.update.password.toString(),
      );
    }
    const teacher = await this.prisma.teacher.update({
      where: { id: id },
      data: { ...data },
    });
    return teacher;
  }

  async remove(id: number) {
    return this.prisma.teacher.delete({ where: { id: id } });
  }
}
