import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreProvider } from './providers/store.provider';

@Module({
  controllers: [StoreController],
  providers: [StoreService,...StoreProvider],
})
export class StoreModule {}
