import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.SubjectCreateInput) {
    data.students?.connect;
    try {
      const subject = await this.prisma.subject.create({ data: { ...data } });
      return subject;
    } catch (err) {
      throw new err();
    }
  }

  async findAll() {
    const subjects = await this.prisma.subject.findMany({
      include: { students: true, Teacher: true },
    });
    return subjects;
  }

  async findOne(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id: id },
      include: {
        Teacher: { include: { user: true } },
        students: { include: { user: true } },
      },
    });
    return subject;
  }

  async update(id: number, data: Prisma.SubjectUpdateInput) {
    const subject = await this.prisma.subject.update({
      where: { id: id },
      data: { ...data },
    });
    return subject;
  }

  async remove(id: number) {
    return await this.prisma.subject.delete({ where: { id: id } });
  }
}
