import { Controller } from '@nestjs/common';
import { OpeningHourService } from './opening_hour.service';

@Controller('opening-hour')
export class OpeningHourController {
  constructor(private readonly openingHourService: OpeningHourService) {}
}
