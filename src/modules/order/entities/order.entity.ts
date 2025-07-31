import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    ForeignKey,
    AllowNull,
    BelongsTo,
    Default,
    HasMany,
} from 'sequelize-typescript';
import { OrderStatus } from 'src/common/enums/order_status';
import { PaymentMethod } from 'src/common/enums/payment_method';

import { Customer } from 'src/modules/customer/entities/customer.entity';
import { OrderItem } from 'src/modules/order_item/entities/order_item.entity';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'orders' })
export class Order extends Model<Order> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Customer)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @ForeignKey(() => Store)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    totalPrice: number;

    @AllowNull(false)
    @Default(OrderStatus.PENDING_PAYMENT)
    @Column(DataType.ENUM(...Object.values(OrderStatus)))
    status: OrderStatus;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(PaymentMethod)))
    paymentMethod: PaymentMethod;

    @AllowNull(false)
    @Default(false)
    @Column(DataType.BOOLEAN)
    isPaid: boolean;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    estimatedTime: number; // in minutes

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}