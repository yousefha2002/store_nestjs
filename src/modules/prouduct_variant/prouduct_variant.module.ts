import { Module } from '@nestjs/common';
import { ProuductVariantService } from './prouduct_variant.service';
import { ProuductVariantController } from './prouduct_variant.controller';

@Module({
  controllers: [ProuductVariantController],
  providers: [ProuductVariantService],
})
export class ProuductVariantModule {}
