import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { PickupMethod } from './entites/pickup_method.entity';
import { PickupMethodEnum } from 'src/common/enums/pickedup_method';

@Injectable()
export class PickupMethodService {
  constructor(
    @Inject(repositories.pickupMethod_repository)
    private pickupMethodRepo: typeof PickupMethod,
  ) {}

  async createMethodsForStore(
    methods: PickupMethodEnum[],
    storeId: string | number,
  ) {
    for (const method of methods) {
      await this.pickupMethodRepo.create({ method, storeId });
    }
  }
}
