import { Controller, Get, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { presetAvatars } from 'src/common/constants/avatars';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterExceptionFilter } from 'src/multer/multer.exception.filter';
import { multerOptions } from 'src/multer/multer.options';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  
  @Get()
  getAvatars() {
    return this.avatarService.findAll()
  }

  @UseGuards(AdminGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  createAvatar(@UploadedFile() file?: Express.Multer.File)
  {
    return this.avatarService.create(file)
  }
}
