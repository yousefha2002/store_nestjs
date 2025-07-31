import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartProvider } from './providers/cart.provider';

@Module({
  controllers: [CartController],
  providers: [CartService,...CartProvider],
})
export class CartModule {}
