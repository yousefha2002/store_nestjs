import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    AutoIncrement,
    PrimaryKey,
    Default,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { TypeLanguage } from './type_language.entity';
import { Image } from 'src/modules/image/entities/image.entity';

@Table({ tableName: 'types' }) 
export class Type extends Model<Type> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Image)
    @AllowNull(true)
    @Column(DataType.INTEGER)
    iconId: number;

    @BelongsTo(() => Image)
    icon: Image;

    @Default(DataType.NOW)
    @Column(DataType.DATE)
    createdAt: Date;

    @HasMany(() => TypeLanguage)
    languages: TypeLanguage[];
}
