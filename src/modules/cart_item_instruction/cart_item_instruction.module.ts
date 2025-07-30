import { Module } from '@nestjs/common';
import { CartItemInstructionService } from './cart_item_instruction.service';
import { CartItemInstructionController } from './cart_item_instruction.controller';

@Module({
  controllers: [CartItemInstructionController],
  providers: [CartItemInstructionService],
})
export class CartItemInstructionModule {}
