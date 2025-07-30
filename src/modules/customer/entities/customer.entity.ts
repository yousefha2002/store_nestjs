import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    Default,
    BelongsTo,
    ForeignKey,
} from 'sequelize-typescript';
import { Image } from 'src/modules/image/entities/image.entity';

@Table({ tableName: 'customers' })
export class Customer extends Model<Customer> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    phone: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isPhoneVerified: boolean;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    email: string;

    @ForeignKey(() => Image)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    imageId: number;

    @BelongsTo(() => Image)
    image: Image;
}