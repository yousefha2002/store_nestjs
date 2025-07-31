import { Body, Controller, Post } from '@nestjs/common';
import { OtpCodeService } from './otp_code.service';
import { SendOtpDto } from './dto/send_otp.dto';

@Controller('otp-code')
export class OtpCodeController {
  constructor(private readonly otpCodeService: OtpCodeService) {}

  @Post('send')
  sendOtp(@Body() body: SendOtpDto) {
    return this.otpCodeService.sendOtp(body.phone);
  }
}
