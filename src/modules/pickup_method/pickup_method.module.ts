import { Module } from '@nestjs/common';
import { PickupMethodService } from './pickup_method.service';
import { PickupMethodController } from './pickup_method.controller';
import { PickupMethodProvider } from './providers/pickup_method.provider';

@Module({
  controllers: [PickupMethodController],
  providers: [PickupMethodService,...PickupMethodProvider],
})
export class PickupMethodModule {}
