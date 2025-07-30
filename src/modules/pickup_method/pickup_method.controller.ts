import { Controller } from '@nestjs/common';
import { PickupMethodService } from './pickup_method.service';

@Controller('pickup-method')
export class PickupMethodController {
  constructor(private readonly pickupMethodService: PickupMethodService) {}
}
