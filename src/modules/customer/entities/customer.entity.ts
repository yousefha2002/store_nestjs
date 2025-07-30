import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
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