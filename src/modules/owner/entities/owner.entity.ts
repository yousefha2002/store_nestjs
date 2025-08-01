import {
  Table,
  Column,
  Model,
  DataType,
  AllowNull,
  PrimaryKey,
  AutoIncrement,
  HasMany,
} from 'sequelize-typescript';
import { Store } from 'src/modules/store/entities/store.entity';

@Table({ tableName: 'owners' })
export class Owner extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column({type:DataType.STRING,unique:true})
  phone: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  commercialRegister: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  taxNumber: string;

  @HasMany(() => Store)
  stores: Store[];
}
