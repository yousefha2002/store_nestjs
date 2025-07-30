import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
    AllowNull,
    Default,
} from 'sequelize-typescript';

@Table({ tableName: 'images' })
export class Image extends Model<Image> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    url: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    publicId: string;
}