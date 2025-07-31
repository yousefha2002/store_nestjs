import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { OtpCodeService } from '../otp_code/otp_code.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CustomerService {
  constructor(
    @Inject(repositories.customer_repository)
    private customerRepo: typeof Customer,
    private otpCodeService: OtpCodeService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createCustomer(body: CreateCustomerDto, file?: Express.Multer.File) {
    const { email, phone, token } = body;
    const existing = await this.customerRepo.findOne({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email is already taken');
    }
    await this.otpCodeService.verifyOtp(phone, token);
    // let imageUrl: string = null;
    // let imagePublicId: string = null;

    // if (file) {
    //     const uploaded = await this.cloudinaryService.uploadImage(file);
    //     imageUrl = uploaded.secure_url;
    //     imagePublicId = uploaded.public_id;
    // }
  }
}
