import { CustomerProvider } from './providers/customer.provider';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { OtpCodeModule } from '../otp_code/otp_code.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AvatarModule } from '../avatar/avatar.module';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService,...CustomerProvider],
  imports:[OtpCodeModule,CloudinaryModule,AvatarModule]
})
export class CustomerModule {}
