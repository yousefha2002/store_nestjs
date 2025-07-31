import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { TypeLanguage } from './entities/type_language.entity';
import { Language } from 'src/common/enums/language';

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
      this.checkTypeLanguage(dto.nameAr),
    ]);
    // const result = await this.cloudinaryService.uploadImage(file);
    const createdData = {
      //   iconUrl: result.secure_url,
      //   iconPublicId: result.public_id,
      iconUrl: 'sw',
      iconPublicId: 'Sw',
    };
    const typeCreated = await this.typeRepo.create({ ...createdData });
    await Promise.all([
      this.createTypeLang(dto.nameEn, Language.en),
      this.createTypeLang(dto.nameAr, Language.ar),
    ]);
  }

  async checkTypeLanguage(name: string) {
    const typeLang = await this.typeLangRepo.findOne({ where: { name } });
    if (typeLang) {
      throw new BadRequestException(`Type name ${name} is already used`);
    }
  }

  async createTypeLang(name: string, languageCode: string) {
    await this.typeLangRepo.create({ name, languageCode });
  }
}
