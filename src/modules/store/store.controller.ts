import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Get,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { multerOptions } from 'src/multer/multer.options';
import {
  OpeningHourEnum,
  validateAndParseOpeningHours,
} from 'src/common/utils/validateAndParseOpeningHours';
import { LoginStoreDto } from './dto/store-login.dto';
import { StoreGuard } from 'src/common/guards/store.guard';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'cover', maxCount: 1 },
      ],
      multerOptions,
    ),
  )
  async create(
    @Body() body: CreateStoreDto,
    @CurrentUser() user: any,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    },
  ) {
    const logoImage = files.logo?.[0];
    const coverImage = files.cover?.[0];

    if (!logoImage || !coverImage) {
      throw new BadRequestException('Both logo and cover images are required');
    }

    const openingHours2 = validateAndParseOpeningHours(body.openingHours);

    console.log({ user, body, openingHours2 });
    return this.storeService.create(
      body,
      user.id,
      openingHours2 as OpeningHourEnum[],
      logoImage,
      coverImage,
    );
  }

  @Post('login')
  login(@Body() body: LoginStoreDto) {
    return this.storeService.login(body);
  }
}
