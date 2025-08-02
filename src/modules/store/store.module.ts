import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreProvider } from './providers/store.provider';
import { OwnerModule } from '../owner/owner.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService, ...StoreProvider],
  imports: [OwnerModule],
})
export class StoreModule {}
