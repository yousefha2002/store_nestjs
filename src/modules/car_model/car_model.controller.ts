import { Controller } from '@nestjs/common';
import { CarModelService } from './car_model.service';

@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}
}
