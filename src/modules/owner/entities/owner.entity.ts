import {Table,Column,Model,DataType,AllowNull,Default,PrimaryKey,AutoIncrement,} from 'sequelize-typescript';

@Table({ tableName: 'owners' })
export class Owner extends Model<Owner> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    phone: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    email: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    commercialRegister: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    taxNumber: string;
}