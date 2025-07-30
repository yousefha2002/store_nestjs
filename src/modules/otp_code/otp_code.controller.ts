import { Controller } from '@nestjs/common';
import { OtpCodeService } from './otp_code.service';

@Controller('otp-code')
export class OtpCodeController {
  constructor(private readonly otpCodeService: OtpCodeService) {}
}
