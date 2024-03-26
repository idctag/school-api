import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsersService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/auth/guard/role-guard';

@UseGuards(JwtGuard, RolesGuard)
@Roles(Role.ADMIN)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.userService.profile(req.user);
  }
}
