import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { OfferProvider } from './providers/offer.provider';

@Module({
  controllers: [OfferController],
  providers: [OfferService,...OfferProvider],
})
export class OfferModule {}
