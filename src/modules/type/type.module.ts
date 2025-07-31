import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeProvider } from './providers/type.provider';
import { TypeLanguageProvider } from './providers/type_language.provider';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [TypeController],
  providers: [TypeService, ...TypeProvider, ...TypeLanguageProvider],
  imports: [CloudinaryModule],
})
export class TypeModule {}
