import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateCarColorDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3, { message: 'Name must be at least 3 characters' })
    @MaxLength(14, { message: 'Name must be at most 20 characters' })
    name: string;
}