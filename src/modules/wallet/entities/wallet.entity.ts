import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    ForeignKey,
    AllowNull,
    BelongsTo,
} from 'sequelize-typescript';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Table({ tableName: 'wallets' })
export class Wallet extends Model{
    @PrimaryKey
    @ForeignKey(() => Customer)
    @Column(DataType.INTEGER)
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @AllowNull(false)
    @Column({ type: DataType.FLOAT, defaultValue: 0 })
    balance: number; // رصيد الفلوس

    @AllowNull(false)
    @Column({ type: DataType.INTEGER, defaultValue: 0 })
    points: number; // رصيد النقاط
}