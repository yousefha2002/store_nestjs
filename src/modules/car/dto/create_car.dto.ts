import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCarDto {

    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(20, { message: 'Name must be at most 20 characters' })
    @IsString()
    @IsNotEmpty()
    carName: string;

    @IsNumber()
    @IsNotEmpty()
    carTypeId: number;

    @IsNumber()
    @IsNotEmpty()
    colorId: number;

    @IsNumber()
    @IsNotEmpty()
    brandId: number;

    @IsNumber()
    @IsNotEmpty()
    modelId: number;

    @IsString()
    @IsOptional()
    plateNumber?: string;

    @IsString()
    @IsOptional()
    plateLetters?: string;

    @IsBoolean()
    @IsOptional()
    isDefault?: boolean;
}