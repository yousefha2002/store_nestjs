import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  Post,
  Put,
  Query,
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
import { Language } from 'src/common/enums/language';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { TypeDto } from './dto/type.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('create')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  createType(
    @Body() dto: CreateTypeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('upload icon is required');
    }
    return this.typeService.createType(dto, file);
  }

  @Put('update/:typeId')
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  updateType(
    @Param('typeId') typeId: string,
    @Body() dto: CreateTypeDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.typeService.updateType(+typeId, dto, file);
  }

  @Delete(':typeId')
  @UseGuards(AdminGuard)
  deleteType(@Param('typeId') typeId: string) {
    return this.typeService.deleteType(+typeId);
  }

  @Get('all')
  @Serilaize(TypeDto)
  getAllTypes(@Query('lang') lang?: Language) {
    const selectedLang = lang ?? Language.en; // Default to English
    return this.typeService.getAllTypes(selectedLang);
  }
}
