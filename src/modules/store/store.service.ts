import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Store } from './entities/store.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { OpeningHour } from '../opening_hour/entites/opening_hour.entity';
import { hashPassword } from 'src/common/utils/password';
import { TypeService } from '../type/type.service';
import { UploadApiResponse } from 'cloudinary';
import { PickupMethodService } from '../pickup_method/pickup_method.service';

@Injectable()
export class StoreService {
  constructor(
    @Inject(repositories.store_repository)
    private storeRepo: typeof Store,
    private readonly cloudinaryService: CloudinaryService,
    private readonly typeService: TypeService,
    private readonly pickupMethodService: PickupMethodService,
  ) {}

  async create(
    dto: CreateStoreDto,
    ownerId: string,
    hours: OpeningHour[],
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
    await this.pickupMethodService.createMethodsForStore(
      dto.pickupMethods,
      newStore.id,
    );
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
    });
    return storeCreated;
  }
}
