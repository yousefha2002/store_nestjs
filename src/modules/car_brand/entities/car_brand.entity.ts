import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    AllowNull,
} from 'sequelize-typescript';

@Table({ tableName: 'car_brands',timestamps: false})
export class CarBrand extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({type:DataType.STRING,unique: true})
    name: string;
}