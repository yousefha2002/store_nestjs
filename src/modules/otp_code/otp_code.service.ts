import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { OtpCode } from './entities/otp_code.entity';
import { generateOtpCode } from 'src/common/utils/generateOtpCode';
import { generateToken } from 'src/common/utils/generateToken';

@Injectable()
export class OtpCodeService {
    constructor(
        @Inject(repositories.otpCode_repository) private otpCodeRepo: typeof OtpCode
    ){}

    async sendOtp(phone: string) {
        const existingOtp = await this.otpCodeRepo.findOne({where:{phone,isUsed:true}})
        if(existingOtp)
        {
            throw new BadRequestException('OTP already sent. Please use the existing one or wait.');
        }
        const code = generateOtpCode();
        await this.otpCodeRepo.create({phone,code,isUsed:false});
        // TODO: Send code via SMS here
        // Example:
        // await this.smsService.send(phone, `Your verification code is ${code}`);
        return {message: 'OTP sent successfully',phone,code,};
    }

    async verifyOtp(phone: string, code: string)
    {
        const record = await this.otpCodeRepo.findOne({
            where: { phone, code, isVerified: false },
            order: [['createdAt', 'DESC']]
        });
        if (!record) {
            throw new BadRequestException('Invalid code or already verified');
        }
        const token = generateToken({ phone });
        record.isVerified = true;
        record.token = token;
        await record.save();
        return { token , message:"success" };
    }

    async validateOtp(phone:string,token:string)
    {
        const otp = await this.otpCodeRepo.findOne({
            where: { phone,token,isVerified: true, isUsed: false },
            order: [['createdAt', 'DESC']],
        });
        if (!otp) {
            throw new BadRequestException('Phone verification failed');
        }
        return otp
    }
}