import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsEmail, IsMobilePhone } from 'class-validator';

export class CreateOwnerDto {
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
  @IsMobilePhone()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  commercialRegister: string;

  @IsString()
  @IsNotEmpty()
  taxNumber: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
