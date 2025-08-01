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
    HasMany,
} from 'sequelize-typescript';
import { CartItem } from 'src/modules/cart_item/entities/cart_item.entity';
import { Category } from 'src/modules/category/entities/category.entity';
import { Offer } from 'src/modules/offer/entities/offer.entity';
import { OrderItem } from 'src/modules/order_item/entities/order_item.entity';
import { ProductExtra } from 'src/modules/product_extra/entities/product_extra.entity';
import { ProductImage } from 'src/modules/product_image/entities/product_image.entity';
import { ProductInstruction } from 'src/modules/product_instruction/entities/product_instruction.entity';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'products' })
export class Product extends Model{
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

    @HasMany(() => ProductExtra)
    extras: ProductExtra[];

    @HasMany(() => ProductInstruction)
    instructions: ProductInstruction[];

    @HasMany(() => ProductImage)
    images: ProductImage[];

    @HasMany(() => CartItem)
    cartItems: CartItem[];

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}