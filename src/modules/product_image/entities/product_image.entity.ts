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
import { Product } from 'src/modules/product/entities/product.entity';


@Table({ tableName: 'product_images' })
export class ProductImage extends Model<ProductImage> {
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
    @Column(DataType.STRING)
    imageUrl:string

    @AllowNull(false)
    @Column(DataType.STRING)
    imagePublicId:string
}