import { Module } from '@nestjs/common';
import { CartItemVariantService } from './cart_item_variant.service';
import { CartItemVariantController } from './cart_item_variant.controller';

@Module({
  controllers: [CartItemVariantController],
  providers: [CartItemVariantService],
})
export class CartItemVariantModule {}
