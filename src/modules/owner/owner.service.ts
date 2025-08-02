import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Owner } from './entities/owner.entity';
import { OtpCodeService } from '../otp_code/otp_code.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { comparePassword, hashPassword } from 'src/common/utils/password';
import { generateToken } from 'src/common/utils/generateToken';
import { RoleStatus } from 'src/common/enums/role_status';
import { LoginOwnerDto } from './dto/owner-login.dto';

@Injectable()
export class OwnerService {
  constructor(
    @Inject(repositories.owner_repository)
    private ownerRepo: typeof Owner,
    private otpCodeService: OtpCodeService,
  ) {}

  async createOwner(dto: CreateOwnerDto) {
    let otp = await this.otpCodeService.validateOtp(dto.phone, dto.token);
    const existing = await this.ownerRepo.findOne({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('Email is already taken');
    }
    const passwordHashed = await hashPassword(dto.password);
    const owener = await this.ownerRepo.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      taxNumber: dto.taxNumber,
      commercialRegister: dto.commercialRegister,
      password: passwordHashed,
    });
    otp.isUsed = true;
    await otp.save();
    const payload = { id: owener.id, role: RoleStatus.OWNER };
    const access_token = generateToken(payload);
    return {
      owener,
      message: 'Owner created successfully',
      token: access_token,
    };
  }

  async login(dto: LoginOwnerDto) {
    const ownerByPass = await this.ownerRepo.findOne({
      where: { phone: dto.phone },
    });
    if (!ownerByPass) {
      throw new NotFoundException('Invalid Phone Number');
    }
    const isMatch = await comparePassword(dto.password, ownerByPass.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { id: ownerByPass.id, role: RoleStatus.OWNER };
    const access_token = generateToken(payload);
    return {
      owner: { id: ownerByPass.id, email: ownerByPass.email },
      token: access_token,
    };
  }
}
