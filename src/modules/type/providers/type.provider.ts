import { repositories } from 'src/common/enums/repositories';
import { Type } from 'class-transformer';
export const TypeProvider = [
    {
        provide: repositories.type_repository,
        useValue: Type,
    },
];