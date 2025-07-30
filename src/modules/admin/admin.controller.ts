import { AdminEmailDto } from './dto/admin-email.dto';
import {
  Body,
  Controller,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { authAdminDto } from './dto/auth-admin.dto';
import { AdminDto } from './dto/admin.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminPasswordDto } from './dto/admin-password.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  async signupAdmin(@Body() body: authAdminDto) {
    const { email, password } = body;
    return this.adminService.signup(email, password);
  }

  @Post('login')
  async loginAdmin(@Body() body: authAdminDto) {
    const { email, password } = body;
    return this.adminService.login(email, password);
  }

  @Serilaize(AdminDto)
  @Patch('email')
  @UseGuards(AdminGuard)
  changeAdminEmail(@Body() body: AdminEmailDto) {
    return this.adminService.changeEmail(body.newEmail);
  }

  @Serilaize(AdminDto)
  @Patch('password')
  @UseGuards(AdminGuard)
  changeAdminPassword(@Body() body: AdminPasswordDto) {
    return this.adminService.changePassword(body);
  }
}
