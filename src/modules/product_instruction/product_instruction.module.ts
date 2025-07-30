import { Module } from '@nestjs/common';
import { ProductInstructionService } from './product_instruction.service';
import { ProductInstructionController } from './product_instruction.controller';

@Module({
  controllers: [ProductInstructionController],
  providers: [ProductInstructionService],
})
export class ProductInstructionModule {}
