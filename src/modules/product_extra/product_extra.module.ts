import { Module } from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';
import { ProductExtraController } from './product_extra.controller';
import { ProductExtraProvider } from './providers/product_extra.provider';

@Module({
  controllers: [ProductExtraController],
  providers: [ProductExtraService,...ProductExtraProvider],
})
export class ProductExtraModule {}
