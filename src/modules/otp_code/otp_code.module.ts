import { Module } from '@nestjs/common';
import { OtpCodeService } from './otp_code.service';
import { OtpCodeController } from './otp_code.controller';

@Module({
  controllers: [OtpCodeController],
  providers: [OtpCodeService],
})
export class OtpCodeModule {}
