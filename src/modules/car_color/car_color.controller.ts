import { Controller } from '@nestjs/common';
import { CarColorService } from './car_color.service';

@Controller('car-color')
export class CarColorController {
  constructor(private readonly carColorService: CarColorService) {}
}
