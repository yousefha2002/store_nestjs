import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Store } from '../store/entities/store.entity';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(repositories.category_repository)
    private categoryRepo: typeof Category,
  ) {}
}
