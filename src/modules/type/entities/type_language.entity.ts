import {
    Table,
    Column,
    Model,
    DataType,
    AllowNull,
    ForeignKey,
    PrimaryKey,
    AutoIncrement,
    BelongsTo,
} from 'sequelize-typescript';

import { Type } from './type.entity';

@Table({ tableName: 'type_languages' })
export class TypeLanguage extends Model<TypeLanguage> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Type)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    typeId: number;

    @BelongsTo(() => Type)
    type: Type;

    @AllowNull(false)
    @Column(DataType.STRING)
    languageCode: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    name: string;
}
