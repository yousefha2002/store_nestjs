import { Controller } from '@nestjs/common';
import { CarTypeService } from './car_type.service';

@Controller('car-type')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}
}
