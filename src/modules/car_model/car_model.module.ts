import { Module } from '@nestjs/common';
import { CarModelService } from './car_model.service';
import { CarModelController } from './car_model.controller';

@Module({
  controllers: [CarModelController],
  providers: [CarModelService],
})
export class CarModelModule {}
