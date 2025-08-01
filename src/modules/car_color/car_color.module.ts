import { Module } from '@nestjs/common';
import { CarColorService } from './car_color.service';
import { CarColorController } from './car_color.controller';
import { CarColorProvider } from './providers/car_color.provider';

@Module({
  controllers: [CarColorController],
  providers: [CarColorService,...CarColorProvider],
})
export class CarColorModule {}
