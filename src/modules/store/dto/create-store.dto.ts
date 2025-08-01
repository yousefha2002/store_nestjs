import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsPhoneNumber, IsEmail } from 'class-validator';

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
}
