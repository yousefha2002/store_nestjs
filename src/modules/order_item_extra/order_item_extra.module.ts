import { Module } from '@nestjs/common';
import { OrderItemExtraService } from './order_item_extra.service';
import { OrderItemExtraController } from './order_item_extra.controller';

@Module({
  controllers: [OrderItemExtraController],
  providers: [OrderItemExtraService],
})
export class OrderItemExtraModule {}
