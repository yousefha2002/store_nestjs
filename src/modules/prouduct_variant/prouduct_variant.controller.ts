import { Controller } from '@nestjs/common';
import { ProuductVariantService } from './prouduct_variant.service';

@Controller('prouduct-variant')
export class ProuductVariantController {
  constructor(private readonly prouductVariantService: ProuductVariantService) {}
}
