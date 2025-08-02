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
} from 'sequelize-typescript';

import { Order } from 'src/modules/order/entities/order.entity';
import { Gift } from 'src/modules/gift/entities/gift.entity';
import { WalletTransactionType } from 'src/common/enums/wallet_transaction_type';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Table({ tableName: 'wallet_transactions' })
export class WalletTransaction extends Model {
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

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(WalletTransactionType)))
    type: WalletTransactionType;

    @AllowNull(true)
    @Column(DataType.FLOAT)
    amountMoney: number;

    @AllowNull(true)
    @Column(DataType.INTEGER)
    amountPoints: number;

    @ForeignKey(() => Order)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    orderId: number;

    @BelongsTo(() => Order)
    order: Order;

    @ForeignKey(() => Gift)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    giftId: number;

    @BelongsTo(() => Gift)
    gift: Gift;

    @AllowNull(true)
    @Column(DataType.STRING)
    note: string;
}