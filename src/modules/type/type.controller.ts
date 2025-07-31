import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TypeService } from './type.service';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { MulterExceptionFilter } from 'src/multer/multer.exception.filter';
import { multerOptions } from 'src/multer/multer.options';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  @UseGuards(AdminGuard)
  createType(
    @Body() dto: CreateTypeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('upload icon is required');
    }
    return this.typeService.createType(dto, file);
  }
}
