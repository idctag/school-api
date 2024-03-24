import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UsersController {
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
