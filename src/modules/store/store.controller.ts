import {
  Controller,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreService } from './store.service';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { multerOptions } from 'src/multer/multer.options';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profile', maxCount: 1 },
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
      profile?: Express.Multer.File[];
      cover?: Express.Multer.File[];
    },
  ) {
    const profileImage = files.profile?.[0];
    const coverImage = files.cover?.[0];

    if (!profileImage || !coverImage) {
      throw new BadRequestException(
        'Both profile and cover images are required',
      );
    }

    console.log({ user, body });
    // return this.storeService.createStore(body, user, profileImage, coverImage);
  }
}
