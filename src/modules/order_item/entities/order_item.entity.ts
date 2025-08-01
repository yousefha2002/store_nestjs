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
    HasMany,
    Default,
} from 'sequelize-typescript';

import { Order } from 'src/modules/order/entities/order.entity';
import { OrderItemExtra } from 'src/modules/order_item_extra/entities/order_item_extra.entity';
import { OrderItemInstruction } from 'src/modules/order_item_instruction/entities/order_item_instruction.entity';
import { OrderItemVariant } from 'src/modules/order_item_variant/entities/order_item_variant.entity';
import { Product } from 'src/modules/product/entities/product.entity';

@Table({ tableName: 'order_items' })
    export class OrderItem extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Order)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    orderId: number;

    @BelongsTo(() => Order)
    order: Order;

    @ForeignKey(() => Product)
    @Column(DataType.INTEGER)
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @AllowNull(false)
    @Column(DataType.STRING)
    productName: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    unitPrice: number; // base price without extras

    @AllowNull(false)
    @Column(DataType.INTEGER)
    quantity: number;

    @AllowNull(true)
    @Default(0)
    @Column(DataType.INTEGER)
    freeQty: number;

    @AllowNull(true)
    @Column(DataType.TEXT)
    note: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    totalPrice: number;

    @HasMany(() => OrderItemExtra)
    extras: OrderItemExtra[];

    @HasMany(() => OrderItemVariant)
    variants: OrderItemVariant[];

    @HasMany(() => OrderItemInstruction)
    instructions: OrderItemInstruction[];
}
