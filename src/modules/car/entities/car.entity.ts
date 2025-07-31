import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';

import { Customer } from 'src/modules/customer/entities/customer.entity';

@Table({ tableName: 'carts' })
export class Car extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Customer)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    customerId: number;

    @BelongsTo(() => Customer)
    customer: Customer;

    @AllowNull(false)
    @Column(DataType.STRING)
    carName: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    carType: string;  // مثل "SUV", "Micro", إلخ

    @AllowNull(false)
    @Column(DataType.STRING)
    color: string;  // "أحمر", "أخضر", إلخ

    @AllowNull(false)
    @Column(DataType.STRING)
    brand: string;  // "Honda", "Toyota", إلخ

    @AllowNull(false)
    @Column(DataType.STRING)
    model: string;  // "Civic", "Corolla", إلخ

    @AllowNull(true)
    @Column(DataType.STRING)
    plateNumber: string;

    @AllowNull(true)
    @Column(DataType.STRING)
    plateLetters: string;

    @Default(false)
    @Column(DataType.BOOLEAN)
    isDefault: boolean;
}
