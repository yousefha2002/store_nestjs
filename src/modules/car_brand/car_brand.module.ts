import { Module } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { CarBrandController } from './car_brand.controller';
import { CarBrandProvider } from './providers/car_brand.provider';

@Module({
  controllers: [CarBrandController],
  providers: [CarBrandService,...CarBrandProvider],
})
export class CarBrandModule {}
