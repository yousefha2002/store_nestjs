import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    PrimaryKey,
    AutoIncrement,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product/entities/product.entity';

import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'store_categories' })
export class Category extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Store)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @AllowNull(false)
    @Column(DataType.STRING)
    title: string;

    @HasMany(() => Product)
    products: Product[];
}
