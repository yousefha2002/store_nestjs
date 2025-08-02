import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { OwnerGuard } from 'src/common/guards/owner.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Owner } from '../owner/entities/owner.entity';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('create')
  @UseGuards(OwnerGuard)
  create(@Body() body: CreateStoreDto, @CurrentUser() user: Owner) {}
}
