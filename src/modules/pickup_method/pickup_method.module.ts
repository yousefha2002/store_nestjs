import { Module } from '@nestjs/common';
import { PickupMethodService } from './pickup_method.service';
import { PickupMethodController } from './pickup_method.controller';

@Module({
  controllers: [PickupMethodController],
  providers: [PickupMethodService],
})
export class PickupMethodModule {}
