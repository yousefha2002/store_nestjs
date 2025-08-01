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
import { CarBrand } from 'src/modules/car_brand/entities/car_brand.entity';
import { CarColor } from 'src/modules/car_color/entities/car_color.entity';
import { CarModel } from 'src/modules/car_model/entites/car_model.entity';
import { CarType } from 'src/modules/car_type/entites/car_type.entity';

import { Customer } from 'src/modules/customer/entities/customer.entity';

@Table({ tableName: 'cars' })
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

    @ForeignKey(() => CarType)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    carTypeId: number;

    @BelongsTo(() => CarType)
    carType: CarType;

    @ForeignKey(() => CarColor)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    colorId: number;

    @BelongsTo(() => CarColor)
    color: CarColor;

    @ForeignKey(() => CarBrand)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    brandId: number;

    @BelongsTo(() => CarBrand)
    brand: CarBrand;

    @ForeignKey(() => CarModel)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    modelId: number;

    @BelongsTo(() => CarModel)
    model: CarModel;

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