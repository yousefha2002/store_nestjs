import { Module } from '@nestjs/common';
import { ProductExtraService } from './product_extra.service';
import { ProductExtraController } from './product_extra.controller';

@Module({
  controllers: [ProductExtraController],
  providers: [ProductExtraService],
})
export class ProductExtraModule {}
