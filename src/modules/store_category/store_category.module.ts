import { Module } from '@nestjs/common';
import { StoreCategoryService } from './store_category.service';
import { StoreCategoryController } from './store_category.controller';

@Module({
  controllers: [StoreCategoryController],
  providers: [StoreCategoryService],
})
export class StoreCategoryModule {}
