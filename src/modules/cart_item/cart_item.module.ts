import { Module } from '@nestjs/common';
import { CartItemService } from './cart_item.service';
import { CartItemController } from './cart_item.controller';
import { CartItemProvider } from './providers/cart_item.provider';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService,...CartItemProvider],
})
export class CartItemModule {}
