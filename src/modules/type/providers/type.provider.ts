import { repositories } from 'src/common/enums/repositories';
import { Type } from 'class-transformer';
import { TypeLanguage } from '../entities/type_language.entity';
export const TypeProvider = [
  {
    provide: repositories.type_repository,
    useValue: Type,
  },
  {
    provide: repositories.typeLanguage_repository,
    useValue: TypeLanguage,
  },
];
