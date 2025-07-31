import { Module } from '@nestjs/common';
import { CartItemExtraService } from './cart_item_extra.service';
import { CartItemExtraController } from './cart_item_extra.controller';
import { CartItemExtraProvider } from './providers/cart_item_extra.provider';

@Module({
  controllers: [CartItemExtraController],
  providers: [CartItemExtraService,...CartItemExtraProvider],
})
export class CartItemExtraModule {}
