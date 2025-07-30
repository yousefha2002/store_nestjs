import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { ProductVariantType } from 'src/common/enums/product_varaint_type';
import { Image } from 'src/modules/image/entities/image.entity';
import { Product } from 'src/modules/product/entities/product.entity';


@Table({ tableName: 'product_variants' })
export class ProductVariant extends Model<ProductVariant> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Product)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(ProductVariantType)))
    type: ProductVariantType;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    priceDiff: number;

    @ForeignKey(() => Image)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    imageId: number;
    
    @BelongsTo(() => Image)
    image: Image;
}