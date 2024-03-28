import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput): Promise<any> {
    try {
      const admin = await this.prisma.admin.create({
        data: {
          ...data,
        },
        include: {
          user: true,
        },
      });
      return admin;
    } catch (err) {
      if (err.code === 'P2002') {
        throw new Error('admin already exists');
      } else {
        throw new err();
      }
    }
  }

  async findAll() {
    const admins = await this.prisma.admin.findMany({
      include: { user: true },
    });
    return admins;
  }

  async findOne(id: number) {
    const admin = await this.prisma.admin.findUnique({
      where: { id: id },
      include: { user: true },
    });
    return admin;
  }

  async update() {}

  async remove(id: number) {
    return this.prisma.admin.delete({ where: { id: id } });
  }
}
