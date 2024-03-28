import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class ManagerService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.ManagerCreateInput) {
    if (data.user.create?.password) {
      data.user.create.password = await argon2.hash(data.user.create.password);
    }
    try {
      const manager = await this.prisma.manager.create({
        data: {
          ...data,
        },
        include: {
          user: true,
        },
      });
      return manager;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new Error('manager already exists');
      } else {
        throw new err();
      }
    }
  }

  async findAll() {
    const managers = await this.prisma.manager.findMany({
      include: { user: true },
    });
    return managers;
  }

  async findOne(id: number) {
    const manager = await this.prisma.manager.findUnique({
      where: { id: id },
      include: { user: true },
    });
    return manager;
  }

  async update(id: number, data: Prisma.ManagerUpdateInput) {
    const manager = await this.prisma.manager.update({
      where: { id: id },
      data: { ...data },
    });
    return manager;
  }

  async remove(id: number) {
    return this.prisma.manager.delete({ where: { id: id } });
  }
}
