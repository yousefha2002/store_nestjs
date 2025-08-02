import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsPhoneNumber,
  IsEmail,
  IsArray,
  IsEnum,
  ArrayNotEmpty,
  ValidateNested,
  IsMobilePhone,
} from 'class-validator';
import { PickupMethodEnum } from 'src/common/enums/pickedup_method';

export class CreateStoreDto {
  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  typeId: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;

  @Transform(({ value }) => {
    try {
      if (typeof value === 'string') {
        const parsed = JSON.parse(value); // يحاول تحويلها لمصفوفة حقيقية
        return Array.isArray(parsed) ? parsed : [parsed];
      }
      return value;
    } catch {
      return typeof value === 'string' ? value.split(',') : value;
    }
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PickupMethodEnum, { each: true })
  pickupMethods: PickupMethodEnum[];

  @IsString()
  @IsNotEmpty()
  openingHours: string;
}

import { DayOfWeek } from 'src/common/enums/day_of_week';

import { ValidateIf } from 'class-validator';

export class CreateOpeningHourDto {
  @IsEnum(DayOfWeek)
  day: DayOfWeek;

  @ValidateIf((o) => o.closeTime !== undefined)
  @IsString()
  openTime?: string;

  @ValidateIf((o) => o.openTime !== undefined)
  @IsString()
  closeTime?: string;
}
