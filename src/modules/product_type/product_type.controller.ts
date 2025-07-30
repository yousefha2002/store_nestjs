import { Controller } from '@nestjs/common';
import { ProductTypeService } from './product_type.service';

@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly productTypeService: ProductTypeService) {}
}
