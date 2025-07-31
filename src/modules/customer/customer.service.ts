import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(repositories.customer_repository) private customerRepo: typeof Customer
    ){}
}
