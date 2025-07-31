import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    HasMany,
} from 'sequelize-typescript';
import { Address } from 'src/modules/address/entities/address.entity';
import { Car } from 'src/modules/car/entities/car.entity';

@Table({ tableName: 'customers' })
export class Customer extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    imageUrl:string

    @AllowNull(true)
    @Column(DataType.STRING)
    imagePublicId:string

    @AllowNull(true)
    @Column(DataType.INTEGER)
    avatarId:number

    @HasMany(() => Address)
    addresses: Address[];

    @HasMany(() => Car)
    cars: Car[];
}