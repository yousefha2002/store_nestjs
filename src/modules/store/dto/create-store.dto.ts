import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsMobilePhone,
  MaxLength,
  MinLength,
} from 'class-validator';

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
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(30, { message: 'Password must be at most 30 characters' })
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


  @IsNotEmpty()
  in_store: boolean;

  @IsNotEmpty()
  drive_thru: boolean;

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
