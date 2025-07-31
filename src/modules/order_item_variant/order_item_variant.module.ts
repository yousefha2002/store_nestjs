import { Module } from '@nestjs/common';
import { OrderItemVariantService } from './order_item_variant.service';
import { OrderItemVariantController } from './order_item_variant.controller';

@Module({
  controllers: [OrderItemVariantController],
  providers: [OrderItemVariantService],
})
export class OrderItemVariantModule {}
