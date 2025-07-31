import { Module } from '@nestjs/common';
import { OtpCodeService } from './otp_code.service';
import { OtpCodeController } from './otp_code.controller';
import { OptCodeProvider } from './providers/opt_code.provider';

@Module({
  controllers: [OtpCodeController],
  providers: [OtpCodeService,...OptCodeProvider],
})
export class OtpCodeModule {}
