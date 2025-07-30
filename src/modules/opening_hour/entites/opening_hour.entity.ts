import {
    Table,
    Column,
    Model,
    DataType,
    AutoIncrement,
    PrimaryKey,
    ForeignKey,
    AllowNull,
    BelongsTo,
} from 'sequelize-typescript';
import { DayOfWeek } from 'src/common/enums/day_of_week';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'opening_hours' })
export class OpeningHour extends Model<OpeningHour> {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Store)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    storeId: number;

    @BelongsTo(() => Store)
    store: Store;

    @AllowNull(false)
    @Column(DataType.ENUM(...Object.values(DayOfWeek)))
    day: DayOfWeek;

    @AllowNull(false)
    @Column(DataType.TIME)
    openTime: string;

    @AllowNull(false)
    @Column(DataType.TIME)
    closeTime: string;
}