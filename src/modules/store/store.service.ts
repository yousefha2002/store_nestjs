import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Store } from './entities/store.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { comparePassword, hashPassword } from 'src/common/utils/password';
import { TypeService } from '../type/type.service';
import { UploadApiResponse } from 'cloudinary';
import { PickupMethodEnum } from 'src/common/enums/pickedup_method';
import { OpeningHourEnum } from 'src/common/utils/validateAndParseOpeningHours';
import { OpeningHourService } from '../opening_hour/opening_hour.service';
import { LoginStoreDto } from './dto/store-login.dto';
import { generateToken } from 'src/common/utils/generateToken';
import { RoleStatus } from 'src/common/enums/role_status';

@Injectable()
export class StoreService {
  constructor(
    @Inject(repositories.store_repository)
    private storeRepo: typeof Store,
    private readonly cloudinaryService: CloudinaryService,
    private readonly typeService: TypeService,
    private readonly openingHourService: OpeningHourService,
  ) {}

  async create(
    dto: CreateStoreDto,
    ownerId: string,
    hours: OpeningHourEnum[],
    logo: Express.Multer.File,
    cover: Express.Multer.File,
  ) {
    await Promise.all([
      this.checkIfPoneUsed(dto.phone),
      this.typeService.findById(dto.typeId),
    ]);
    const [logoUpload, coverUpload] = await Promise.all([
      this.cloudinaryService.uploadImage(logo),
      await this.cloudinaryService.uploadImage(cover),
    ]);

    const newStore = await this.creataionOfStore(
      ownerId,
      dto,
      logoUpload,
      coverUpload,
    );

    await this.openingHourService.createOpiningHourForStore(newStore.id, hours);
    return { message: 'store has been created' };
  }

  async checkIfPoneUsed(phone: string) {
    const store = await this.storeRepo.findOne({ where: { phone } });
    if (store) {
      throw new BadRequestException('Store phone already used');
    }
    return false;
  }

  async creataionOfStore(
    ownerId: string,
    dto: CreateStoreDto,
    logoUpload: UploadApiResponse,
    coverUpload: UploadApiResponse,
  ) {
    const passwordHashed = await hashPassword(dto.password);
    const storeCreated = await this.storeRepo.create({
      phone: dto.phone,
      lat: dto.lat,
      lng: dto.lng,
      name: dto.name,
      password: passwordHashed,
      address: dto.address,
      typeId: dto.typeId,
      logoUrl: logoUpload.secure_url,
      logoPublicId: logoUpload.public_id,
      coverUrl: coverUpload.secure_url,
      coverPublicId: coverUpload.public_id,
      ownerId: ownerId,
      in_store: dto.in_store,
      drive_thru: dto.drive_thru,
    });
    return storeCreated;
  }

  async login(dto: LoginStoreDto) {
    const storeByPass = await this.storeRepo.findOne({
      where: { phone: dto.phone },
    });
    if (!storeByPass) {
      throw new NotFoundException('Invalid Phone Number');
    }
    const isMatch = await comparePassword(dto.password, storeByPass.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { id: storeByPass.id, role: RoleStatus.STORE };
    const access_token = generateToken(payload);
    return {
      store: { id: storeByPass.id, phone: storeByPass.phone },
      token: access_token,
    };
  }

  async storeById(id: string | number) {
    return this.storeRepo.findByPk(id);
  }
}
