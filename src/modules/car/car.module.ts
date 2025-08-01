import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';
import { CarProvider } from './providers/car.provider';
import { CarColorModule } from '../car_color/car_color.module';
import { CarBrandModule } from '../car_brand/car_brand.module';
import { CarModelModule } from '../car_model/car_model.module';
import { CarTypeModule } from '../car_type/car_type.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  controllers: [CarController],
  providers: [CarService,...CarProvider],
  imports:[CarColorModule,CarBrandModule,CarModelModule,CarTypeModule,CustomerModule]
})
export class CarModule {}
