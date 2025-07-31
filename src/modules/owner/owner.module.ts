import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerProvider } from './providers/owner.provider';

@Module({
  controllers: [OwnerController],
  providers: [OwnerService,...OwnerProvider],
})
export class OwnerModule {}
