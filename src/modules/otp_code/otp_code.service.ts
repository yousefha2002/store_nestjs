import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { OtpCode } from './entities/otp_code.entity';
import { generateOtpCode } from 'src/common/utils/generateOtpCode';

@Injectable()
export class OtpCodeService {
    constructor(
        @Inject(repositories.otpCode_repository) private otpCodeRepo: typeof OtpCode
    ){}

    async sendOtp(phone: string) {
        const code = generateOtpCode();
        await this.otpCodeRepo.create({phone,code});
        // TODO: Send code via SMS here
        // Example:
        // await this.smsService.send(phone, `Your verification code is ${code}`);
        return {message: 'OTP sent successfully',phone,code,};
    }
}
