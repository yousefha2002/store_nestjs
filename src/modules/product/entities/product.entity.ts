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
    Default,
} from 'sequelize-typescript';
import { Category } from 'src/modules/category/entities/category.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'products' })
export class Product extends Model<Product> {
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

    @ForeignKey(() => Category)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    shortDescription: string;

    @AllowNull(false)
    @Column(DataType.TEXT)
    longDescription: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    basePrice: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    preparationTime: number;

    @Default(true)
    @Column(DataType.BOOLEAN)
    isActive: boolean;

    @ForeignKey(() => Offer)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    offerId: number;

    @BelongsTo(() => Offer)
    offer: Offer;
}