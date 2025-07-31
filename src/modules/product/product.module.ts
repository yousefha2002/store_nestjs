import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductProvider } from './providers/product.provider';

@Module({
  controllers: [ProductController],
  providers: [ProductService,...ProductProvider],
})
export class ProductModule {}
