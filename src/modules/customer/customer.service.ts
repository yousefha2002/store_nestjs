import { AvatarService } from './../avatar/avatar.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { OtpCodeService } from '../otp_code/otp_code.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { presetAvatars } from 'src/common/constants/avatars';

@Injectable()
export class CustomerService {
    constructor(
        @Inject(repositories.customer_repository) private customerRepo: typeof Customer,
        private otpCodeService:OtpCodeService,
        private cloudinaryService:CloudinaryService,
        private avatarService:AvatarService
    ){}

    async createCustomer(body:CreateCustomerDto,file?:Express.Multer.File)
    {
        const {email,phone,token} = body
        const existing = await this.customerRepo.findOne({ where: { email} });
        if (existing) {
            throw new BadRequestException('Email is already taken');
        }
        let otp = await this.otpCodeService.validateOtp(phone,token)
        
        // one of them shuold send
        if (body.avatarId && file) {
            throw new BadRequestException('Choose either avatar or upload image, not both.');
        }
        if (!body.avatarId && !file) {
            throw new BadRequestException('You must choose avatar or upload image.');
        }

        let imageUrl: string|null = null;
        let imagePublicId: string|null = null;
        let avatarId: number|null = null;
        if (file) {
            const uploaded = await this.cloudinaryService.uploadImage(file);
            imageUrl = uploaded.secure_url;
            imagePublicId = uploaded.public_id;
        }

        if (body.avatarId) {
            const avatar = this.avatarService.findById(body.avatarId)
            if (!avatar) {
                throw new BadRequestException('Invalid avatar selected');
            }
            avatarId = avatar.id;
        }
        const customer = await this.customerRepo.create({
            name: body.name,
            email: body.email,
            phone: body.phone,
            imageUrl,
            imagePublicId,
            avatarId,
        });
        otp.isUsed = true;
        await otp.save();
        return {customer,message: 'Customer created successfully'}
    }
}
