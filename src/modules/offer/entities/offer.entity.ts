import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    ForeignKey,
    BelongsTo,
    AllowNull,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { DurationUnit } from 'src/common/enums/dauration_unit';
import { OfferType } from 'src/common/enums/offer_type';
import { Product } from 'src/modules/product/entities/product.entity';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'offers' })
export class Offer extends Model<Offer> {
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
    name: string;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(OfferType)))
    type: OfferType;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    fixedPrice: number;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    discountPercentage: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    buyQty: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    getFreeQty: number;

    @AllowNull(false)
    @Column(DataType.INTEGER)
    duration: number;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(DurationUnit)))
    durationUnit: DurationUnit;

    @AllowNull(false)
    @Column(DataType.DATE)
    startDate: Date;

    @AllowNull(false)
    @Column(DataType.DATE)
    endDate: Date;

    @HasMany(() => Product)
    products: Product[];
}