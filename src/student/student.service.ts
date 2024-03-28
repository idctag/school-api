import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) { }

  async create(data: Prisma.StudentCreateInput): Promise<any> {
    if (data.user.create?.password) {
      data.user.create.password = await argon2.hash(data.user.create.password);
    }
    try {
      const student = await this.prisma.student.create({
        data: {
          ...data,
        },
        include: {
          user: true,
        },
      });
      return student;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new Error('student already exists');
      } else {
        throw new err();
      }
    }
  }

  async findAll() {
    const students = await this.prisma.student.findMany({
      include: { user: true },
    });
    return students;
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: id },
      include: { user: true },
    });
    return student;
  }

  async update(id: number, data: Prisma.StudentUpdateInput) {
    if (data.user?.update?.password) {
      data.user.update.password = await argon2.hash(
        data.user.update.password.toString(),
      );
    }
    const student = await this.prisma.student.update({
      where: { id: id },
      data: { ...data },
    });
    return student;
  }

  async remove(id: number) {
    return this.prisma.student.delete({ where: { id: id } });
  }
}
