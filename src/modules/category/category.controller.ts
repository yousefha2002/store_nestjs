import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { StoreOrOwnerGuard } from 'src/common/guards/StoreOrOwnerGuard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Store } from '../store/entities/store.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

    @Get()
    @UseGuards(StoreOrOwnerGuard)
    validate(@CurrentUser() store:Store)
    {
      return store
    }
}