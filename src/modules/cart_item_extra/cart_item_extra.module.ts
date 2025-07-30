import { Module } from '@nestjs/common';
import { CartItemExtraService } from './cart_item_extra.service';
import { CartItemExtraController } from './cart_item_extra.controller';

@Module({
  controllers: [CartItemExtraController],
  providers: [CartItemExtraService],
})
export class CartItemExtraModule {}
