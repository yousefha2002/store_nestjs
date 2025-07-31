import { AdminEmailDto } from './dto/admin-email.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { authAdminDto } from './dto/auth-admin.dto';
import { AdminDto } from './dto/admin.dto';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { AdminPasswordDto } from './dto/admin-password.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { multerOptions } from 'src/multer/multer.options';
import { MulterExceptionFilter } from 'src/multer/multer.exception.filter';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  @Post('image')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  async signUpUser(@UploadedFile() file?: Express.Multer.File) {
    if (file) {
      const result = await this.cloudinaryService.uploadImage(file);
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
  }

  @Post('multiple-images')
  @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  @UseFilters(MulterExceptionFilter)
  async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded or invalid files.');
    }

    const uploadResults = await Promise.all(
      files.map((file) => this.cloudinaryService.uploadImage(file)),
    );

    return uploadResults.map((result) => ({
      url: result.secure_url,
      publicId: result.public_id,
    }));
  }
}
