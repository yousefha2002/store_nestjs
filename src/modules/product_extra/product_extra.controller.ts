import { Controller } from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';

@Controller('product-extra')
export class ProductExtraController {
  constructor(private readonly productExtraService: ProductExtraService) {}
}
