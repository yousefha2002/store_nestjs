import { Module } from '@nestjs/common';
import { CartItemVariantService } from './cart_item_variant.service';
import { CartItemVariantController } from './cart_item_variant.controller';
import { CartItemVariantProvider } from './providers/cart_item_variant.provider';

@Module({
  controllers: [CartItemVariantController],
  providers: [CartItemVariantService,...CartItemVariantProvider],
})
export class CartItemVariantModule {}
