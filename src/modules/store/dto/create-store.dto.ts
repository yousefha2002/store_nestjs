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
  IsOptional,
} from 'class-validator';
import { PickupMethodEnum } from 'src/common/enums/pickedup_method';

export class CreateStoreDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @Transform(({ value }) => value?.trim())
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  commercialRegister: string;

  @IsString()
  @IsNotEmpty()
  taxNumber: string;

  @Transform(({ value }) => value?.trim().toLowerCase())
  @IsString()
  @IsNotEmpty()
  storeName: string;

  @Transform(({ value }) => value?.trim())
  @IsPhoneNumber()
  @IsNotEmpty()
  storePhone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  lat: string;

  @IsString()
  @IsNotEmpty()
  lng: string;

  @IsString()
  @IsNotEmpty()
  typeId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(PickupMethodEnum, { each: true })
  pickupMethods: PickupMethodEnum[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOpeningHourDto)
  openingHours: CreateOpeningHourDto[];
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
