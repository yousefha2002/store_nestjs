import { Module } from '@nestjs/common';
import { ProductInstructionService } from './product_instruction.service';
import { ProductInstructionController } from './product_instruction.controller';
import { ProductInstructionProvider } from './providers/product_instruction.provider';

@Module({
  controllers: [ProductInstructionController],
  providers: [ProductInstructionService,...ProductInstructionProvider],
})
export class ProductInstructionModule {}
