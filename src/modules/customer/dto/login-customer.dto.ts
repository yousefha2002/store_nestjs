import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';

export class LoginCustomerDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @Transform(({ value }) => value?.trim())
    @IsMobilePhone()
    @IsNotEmpty()
    phone: string;
}
