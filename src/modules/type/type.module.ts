import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { TypeProvider } from './providers/type.provider';
import { TypeLanguageProvider } from './providers/type_language.provider';

@Module({
  controllers: [TypeController],
  providers: [TypeService,...TypeProvider,...TypeLanguageProvider],
})
export class TypeModule {}
