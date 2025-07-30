import { Controller } from '@nestjs/common';
import { ProductInstructionService } from './product_instruction.service';

@Controller('product-instruction')
export class ProductInstructionController {
  constructor(private readonly productInstructionService: ProductInstructionService) {}
}
