import { Module } from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreController } from './store.controller';
import { StoreProvider } from './providers/store.provider';
import { OwnerModule } from '../owner/owner.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeModule } from '../type/type.module';
import { OpeningHourModule } from '../opening_hour/opening_hour.module';

@Module({
  controllers: [StoreController],
  providers: [StoreService, ...StoreProvider],
  imports: [OwnerModule, CloudinaryModule, TypeModule, OpeningHourModule],
  exports:[StoreService]
})
export class StoreModule {}
