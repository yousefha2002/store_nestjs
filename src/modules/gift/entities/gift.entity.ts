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
import { GiftType } from 'src/common/enums/gift_type';
import { Customer } from 'src/modules/customer/entities/customer.entity';

@Table({ tableName: 'gifts' })
export class Gift extends Model<Gift> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Customer)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    senderId: number;

    @BelongsTo(() => Customer, 'senderId')
    sender: Customer;

    @ForeignKey(() => Customer)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    receiverId: number;

    @BelongsTo(() => Customer, 'receiverId')
    receiver: Customer;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(GiftType)))
    giftType: GiftType

    @AllowNull(false)
    @Column(DataType.FLOAT)
    amount: number;

    @AllowNull(true)
    @Column(DataType.STRING)
    note: string;
}