import { AvatarService } from './../avatar/avatar.service';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Customer } from './entities/customer.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { OtpCodeService } from '../otp_code/otp_code.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { RoleStatus } from 'src/common/enums/role_status';
import { generateToken } from 'src/common/utils/generateToken';
import { hashPassword } from 'src/common/utils/password';
import { I18nService } from 'nestjs-i18n';
import { Language } from 'src/common/enums/language';

@Injectable()
export class CustomerService {
    constructor(
    @Inject(repositories.customer_repository)
    private customerRepo: typeof Customer,
    private otpCodeService: OtpCodeService,
    private cloudinaryService: CloudinaryService,
    private avatarService: AvatarService,
    private readonly i18n: I18nService
    ) {}

    async createCustomer(body: CreateCustomerDto,lang=Language.en, file?: Express.Multer.File) 
    {
        const { email, phone, token,password } = body;
        let otp = await this.otpCodeService.validateOtp(phone, token);
        const existing = await this.customerRepo.findOne({ where: { email } });
        if (existing) {
            const message = this.i18n.translate('translation.email_exists', { lang });
            throw new BadRequestException(message)
        }
        // one of them shuold send
        if (body.avatarId && file) {
            const message = this.i18n.translate('translation.both_avatar_and_image', { lang });
            throw new BadRequestException(message)    
        }
        if (!body.avatarId && !file) {
            const message = this.i18n.translate('translation.no_avatar_or_image', { lang });
            throw new BadRequestException(message);
        }

        let imageUrl: string | null = null;
        let imagePublicId: string | null = null;
        let avatarId: number | null = null;
        if (file) {
            const uploaded = await this.cloudinaryService.uploadImage(file);
            imageUrl = uploaded.secure_url;
            imagePublicId = uploaded.public_id;
        }
        if (body.avatarId) {
            const avatar = await this.avatarService.findById(+body.avatarId)
            avatarId = avatar.id;
        }
        const hashedPassword = await hashPassword(password);
        const customer = await this.customerRepo.create({
            name: body.name,
            email,
            phone,
            password:hashedPassword,
            imageUrl,
            imagePublicId,
            avatarId,
        });
        otp.isUsed = true;
        await otp.save();
        const payload = { id: customer.id,role:RoleStatus.CUSTOMER };
        const access_token = generateToken(payload);
        const { password: _, ...safeCustomer } = customer.toJSON();
        const message = this.i18n.translate('translation.createdSuccefully', { lang });
        return {customer:safeCustomer,message: message,token:access_token}

    }

    findById(id:number)
    {
        return this.customerRepo.findByPk(id)
    }
}
