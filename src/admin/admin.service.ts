import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as argon2 from 'argon2';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}
  async create(email: string, password: string): Promise<any> {
    const hashedPass = await argon2.hash(password);
    return this.prisma.admin.create({
      data: {
        super: false,
        user: {
          create: {
            email,
            password: hashedPass,
            roles: ['ADMIN'],
          },
        },
      },
      include: {
        user: true,
      },
    });
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
