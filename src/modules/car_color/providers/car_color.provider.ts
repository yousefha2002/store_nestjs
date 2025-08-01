import { repositories } from 'src/common/enums/repositories';
import { CarColor } from '../entities/car_color.entity';
export const CarColorProvider = [
    {
        provide: repositories.car_color_repository,
        useValue: CarColor,
    },
];
