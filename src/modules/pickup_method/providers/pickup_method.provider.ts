import { repositories } from 'src/common/enums/repositories';
import { PickupMethod } from '../entites/pickup_method.entity';
export const PickupMethodProvider = [
    {
        provide: repositories.pickupMethod_repository,
        useValue: PickupMethod,
    },
];