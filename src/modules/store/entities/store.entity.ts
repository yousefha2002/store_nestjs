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
} from 'sequelize-typescript';

import { StoreStatus } from 'src/common/enums/store_status';
import { Owner } from 'src/modules/owner/entities/owner.entity';
import { Type } from 'src/modules/type/entities/type.entity';

@Table({ tableName: 'stores' })
export class Store extends Model{
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Owner)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    ownerId: number;

    @BelongsTo(() => Owner)
    owner: Owner;

    @ForeignKey(() => Type)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    typeId: number;

    @BelongsTo(() => Type)
    type: Type;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    storeNumber: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    address: string;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    lat: number;

    @AllowNull(false)
    @Column(DataType.FLOAT)
    lng: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    logoUrl:string

    @AllowNull(false)
    @Column(DataType.STRING)
    logoPublicId:string

    @AllowNull(false)
    @Column(DataType.STRING)
    coverUrl:string

    @AllowNull(false)
    @Column(DataType.STRING)
    coverPublicId:string

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @Default(StoreStatus.PENDING)
    @Column(DataType.ENUM(...Object.values(StoreStatus)))
    status: StoreStatus;
}