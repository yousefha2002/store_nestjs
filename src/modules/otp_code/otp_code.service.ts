import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { OtpCode } from './entities/otp_code.entity';

@Injectable()
export class OtpCodeService {
    constructor(
        @Inject(repositories.otpCode_repository) private otpCodeRepo: typeof OtpCode
    ){}
}
