import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
    HasMany,
    ForeignKey,
    BelongsTo,
    Default,
} from 'sequelize-typescript';
import { Address } from 'src/modules/address/entities/address.entity';
import { Avatar } from 'src/modules/avatar/entities/avatar.entity';
import { Car } from 'src/modules/car/entities/car.entity';

@Table({ tableName: 'customers' })
export class Customer extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({type:DataType.STRING,unique:true})
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

    @ForeignKey(() => Avatar)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    avatarId:number
    
    @BelongsTo(() => Avatar)
    avatar: Avatar;

    @HasMany(() => Address)
    addresses: Address[];

    @HasMany(() => Car)
    cars: Car[];

    @Default(0)
    @Column(DataType.FLOAT)
    balance: number;

    @Default(0)
    @Column(DataType.INTEGER)
    points: number;
}