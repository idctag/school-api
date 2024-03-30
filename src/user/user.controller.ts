import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsersService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtGuard)
@Controller('user')
@ApiTags('user')
@ApiBearerAuth()
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('profile')
  getProfile(@Request() req: any) {
    return this.userService.profile(req.user);
  }
}
