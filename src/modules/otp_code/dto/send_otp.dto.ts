import { Matches } from "class-validator";

export class SendOtpDto {
    @Matches(/^[0-9]{8,15}$/, {message: 'Phone number must be digits only and between 8-15 characters',})
    phone: string;
}