import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { LoginOwnerDto } from './dto/owner-login.dto';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post('create')
  async createOwner(@Body() body: CreateOwnerDto) {
    return this.ownerService.createOwner(body);
  }

  @Post('login')
  async loginOwner(@Body() body: LoginOwnerDto) {
    return this.ownerService.login(body);
  }
}
