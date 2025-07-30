import { Module } from '@nestjs/common';
import { OpeningHourService } from './opening_hour.service';
import { OpeningHourController } from './opening_hour.controller';

@Module({
  controllers: [OpeningHourController],
  providers: [OpeningHourService],
})
export class OpeningHourModule {}
