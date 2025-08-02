import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from 'class-validator';

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
    @MinLength(6, { message: 'Password must be at least 6 characters' })
    @MaxLength(30, { message: 'Password must be at most 30 characters' })
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    token: string;

    @IsOptional()
    @IsString()
    avatarId?: string;
}
