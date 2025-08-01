import { Module } from '@nestjs/common';
import { CarTypeService } from './car_type.service';
import { CarTypeController } from './car_type.controller';

@Module({
  controllers: [CarTypeController],
  providers: [CarTypeService],
})
export class CarTypeModule {}
