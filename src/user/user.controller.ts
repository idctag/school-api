import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsersService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.userService.profile(req.user);
  }
}
