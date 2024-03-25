import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetUser } from 'src/types/user.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }

  async profile(req: any): Promise<GetUser | null> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: req.userId },
        select: {
          id: true,
          age: true,
          email: true,
          phone: true,
          roles: true,
          status: true,
          birthday: true,
          last_name: true,
          first_name: true,
          created_at: true,
          updated_at: true,
          residentId: true,
        },
      });

      return user;
    } catch (err) {
      throw err;
    }
  }
}
