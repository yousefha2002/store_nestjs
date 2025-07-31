import { Module } from '@nestjs/common';
import { OrderItemInstructionService } from './order_item_instruction.service';
import { OrderItemInstructionController } from './order_item_instruction.controller';

@Module({
  controllers: [OrderItemInstructionController],
  providers: [OrderItemInstructionService],
})
export class OrderItemInstructionModule {}
