import { IsEmail, IsNotEmpty, IsOptional, IsString, IsNumber, MinLength, MaxLength } from 'class-validator';

export class CreateCustomerDto {
    @IsNotEmpty()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(20, { message: 'Name must be at most 20 characters' })
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsOptional()
    @IsString()
    avatarId?: string;
}
