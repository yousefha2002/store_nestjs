import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { CarColor } from '../car_color/entities/car_color.entity';
import { CreateCarColorDto } from '../car_color/dto/create_car_color.dto';
import { UpdateCarColorDto } from '../car_color/dto/updae_car_color.dto';
import { I18nService } from 'nestjs-i18n';
import { Language } from 'src/common/enums/language';

@Injectable()
export class CarColorService {
    constructor(
        @Inject(repositories.car_color_repository)
        private carColorRepo: typeof CarColor,
        private readonly i18n: I18nService,
    ) {}

    async create(dto: CreateCarColorDto, lang = Language.en) {
        const exists = await this.carColorRepo.findOne({ where: { name: dto.name } });

        if (exists) {
            const message = this.i18n.translate('translation.name_exists', { lang });
            throw new BadRequestException(message);
        }

        return this.carColorRepo.create({ ...dto });
    }

    async update(id: number, dto: UpdateCarColorDto, lang = Language.en) {
        const color = await this.getOneOrFail(id, lang);

        if (dto.name === color.name) {
            return color;
        }

        if (dto.name) {
            const exists = await this.carColorRepo.findOne({ where: { name: dto.name } });
            if (exists && exists.id !== id) {
                const message = this.i18n.translate('translation.name_exists', { lang });
                throw new BadRequestException(message);
            }
        }

        return color.update(dto);
    }

    async getAll() {
        return this.carColorRepo.findAll();
    }

    async getOneOrFail(id: number, lang = Language.en) {
        const color = await this.carColorRepo.findByPk(id);
        if (!color) {
            const message = this.i18n.translate('translation.not_found', { lang });
            throw new NotFoundException(message);
        }
        return color;
    }
}