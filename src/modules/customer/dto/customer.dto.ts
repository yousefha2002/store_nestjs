import { Expose, Type } from 'class-transformer';

class SimpleEntityDto {
    @Expose()
    id: number;

    @Expose()
    url: string;
}

export class CustomerDto {
    @Expose()
    id: number;

    @Expose()
    phone: string;

    @Expose()
    name: string;

    @Expose()
    email: string;

    @Expose()
    imageUrl: string;

    @Expose()
    balance: number;

    @Expose()
    points: number;

    @Expose()
    @Type(() => SimpleEntityDto)
    avatar: SimpleEntityDto;
}