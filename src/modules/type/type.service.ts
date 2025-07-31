import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TypeLanguage } from './entities/type_language.entity';

@Injectable()
export class TypeService {
  constructor(
    @Inject(repositories.type_repository) private typeRepo: typeof Type,
    @Inject(repositories.typeLanguage_repository)
    private typeLangRepo: typeof TypeLanguage,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createType(dto: CreateTypeDto, file: Express.Multer.File) {
    const [] = await Promise.all([
      this.checkTypeLanguage(dto.nameEn),
      this.checkTypeLanguage(dto.nameAR),
    ]);
    const result = await this.cloudinaryService.uploadImage(file);
    const createdData = {
      iconUrl: result.secure_url,
      iconPublicId: result.public_id,
    };
    // const typeCreated = await this.typeRepo.create(createdData)
  }

  async checkTypeLanguage(name: string) {
    const typeLang = await this.typeLangRepo.findOne({ where: { name } });
    if (typeLang) {
      throw new BadRequestException(`Type name ${name} is already used`);
    }
  }
}
