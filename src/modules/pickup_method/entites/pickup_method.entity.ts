import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  AllowNull,
  BelongsTo,
} from 'sequelize-typescript';
import { PickupMethodEnum } from 'src/common/enums/pickedup_method';

import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'pickup_methods' })
export class PickupMethod extends Model<PickupMethod> {
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
    @Column(DataType.ENUM(...Object.values(PickupMethodEnum)))
    method: PickupMethodEnum;
}
