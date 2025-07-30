import { Controller } from '@nestjs/common';
import { StoreCategoryService } from './store_category.service';

@Controller('store-category')
export class StoreCategoryController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}
}
