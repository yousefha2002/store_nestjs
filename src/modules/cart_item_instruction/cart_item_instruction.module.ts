import { Module } from '@nestjs/common';
import { CartItemInstructionService } from './cart_item_instruction.service';
import { CartItemInstructionController } from './cart_item_instruction.controller';
import { CartItemInstructionProvider } from './providers/cart_item_instruction.provider';

@Module({
  controllers: [CartItemInstructionController],
  providers: [CartItemInstructionService,...CartItemInstructionProvider],
})
export class CartItemInstructionModule {}
